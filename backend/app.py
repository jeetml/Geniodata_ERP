from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import pickle
import  numpy as np
from prophet import Prophet
from datetime import datetime, timedelta
import plotly.express as px
import plotly.io as pio
import io


app = Flask(__name__)
CORS(app)  # This allows your React app to make requests to the Flask API

# Load your trained model and scaler
model = joblib.load('model_per.pkl')
scaler = joblib.load('scaler_per.pkl')

with open('product_to_id.pkl', 'rb') as f:
    product_to_id = pickle.load(f)

with open('id_to_product.pkl', 'rb') as f:
    id_to_product = pickle.load(f)

with open('product_similarity.pkl', 'rb') as f:
    product_similarity = pickle.load(f)


def generate_optimal_price(prices):
    prices = np.array(prices)
    return int(np.min(prices))


def predict_month_sales(data, month_year):
    # Prepare data for Prophet
    data.rename(columns={'date': 'ds', 'sell_price': 'y'}, inplace=True)
    data['ds'] = pd.to_datetime(data['ds'])  # Convert date column to datetime

    # Initialize and fit the Prophet model
    model = Prophet()
    model.fit(data)

    # Convert user input to start and end dates
    start_date = datetime.strptime(month_year, '%Y-%m')
    end_date = start_date.replace(day=1, month=start_date.month % 12 + 1)  # Next month start

    # Create future dates DataFrame
    future = pd.date_range(start=start_date, end=end_date - pd.Timedelta(days=1), freq='D')
    future_df = pd.DataFrame({'ds': future})

    # Predict future values
    forecast = model.predict(future_df)

    # Calculate total sales for the month
    total_sales = forecast['yhat'].sum()

    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']], total_sales

#  Define a route requests

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    data = pd.read_csv(file)

    # Ensure the CSV has the required columns
    required_columns = ['number_of_stock', 'selling_price', 'days_to_sell', 'purchase_price']
    if not all(column in data.columns for column in required_columns):
        return jsonify({"error": "CSV file must contain the following columns: number_of_stock, selling_price, days_to_sell, purchase_price"}), 400

    # Scale the data
    scaled_data = scaler.transform(data[required_columns])

    # Predict and calculate probabilities
    probabilities = model.predict_proba(scaled_data)[:, 1] * 100
    data['performance_percentage'] = probabilities

    # Add a placeholder for 'model' if it doesn't exist in the CSV
    if 'model' not in data.columns:
        data['model'] = [f'Model {i+1}' for i in range(len(data))]

    return jsonify(data[['product_name','model', 'performance_percentage']].to_dict(orient='records'))

@app.route('/bundle', methods=['GET'])
def recommend():
    product_name = request.args.get('product_name')
    top_n = int(request.args.get('top_n', 5))

    if product_name not in product_to_id:
        return jsonify({'error': f"Product '{product_name}' not found."}), 404

    product_id = product_to_id[product_name]
    similarity_scores = product_similarity[product_id]
    similar_product_indices = np.argsort(-similarity_scores)[:top_n + 1]
    recommended_product_indices = similar_product_indices[similar_product_indices != product_id]
    recommended_products = [id_to_product[idx] for idx in recommended_product_indices]

    return jsonify({'recommended_products': recommended_products})

@app.route('/dprice',methods=['POST'])
def optimal_price():
    data = request.json
    prices = data.get('prices', [])

    if not prices or not all(isinstance(price, (int, float)) for price in prices):
        return jsonify({'error': 'Invalid input data. Please provide a list of numeric prices.'}), 400

    optimal_price = generate_optimal_price(prices)
    return jsonify({'optimal_price': optimal_price})  

@app.route('/Predictsales', methods=['POST'])
def predict_sales():
    print("Received request on /Predictsales")
    try:
        # Get the uploaded file and month_year parameter
        file = request.files['file']
        month_year = request.form.get('month_year')
        print("Received request on /Predictsales1")

        if not file or not month_year:
            return jsonify({'error': 'file and month_year parameters are required'}), 400

        # Read the file into a pandas DataFrame
        file_content = file.read().decode('utf-8')
        print("File Content:\n", file_content)
        data = pd.read_csv(io.StringIO(file_content))

        # Convert the 'date' column to datetime with the correct format
        data['date'] = pd.to_datetime(data['date'], format="%d-%m-%Y")
        print("DataFrame Head:\n", data.head())
        print("Received request on /Predictsales2")

        # Predict sales
        try:
            forecast, total_sales = predict_month_sales(data, month_year)
        except Exception as e:
            print("Error in predict_month_sales:", str(e))
            return jsonify({'error': 'Error in predicting sales: ' + str(e)}), 500

        # Convert forecast DataFrame to dict for easy JSON serialization
        forecast_dict = forecast.to_dict(orient='records')
        print("Received request on /Predictsales3")

        # Return the results as JSON
        return jsonify({'forecast': forecast_dict, 'total_sales': total_sales})

    except Exception as e:
        print("General Error:", str(e))
        return jsonify({'error': str(e)}), 500
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        df = pd.read_csv(file)
        # Process the data
        df['date'] = pd.to_datetime(df['date'], format='%d-%m-%Y')
        df['profit'] = df['number_of_product'] * df['sell_price']
        df['week'] = df['date'].dt.isocalendar().week
        df['week_label'] = df['week'].apply(lambda x: f"Week {x}")

        # Generate charts
        charts = {}
        
        # 1) Bar Chart -> Best Profit Brand
        best_profit_brand = df.groupby('brand')['profit'].sum().reset_index()
        fig = px.bar(best_profit_brand, x='brand', y='profit', title='Best Profit by Brand')
        charts['best_profit_brand'] = pio.to_json(fig)

        # 2) Line Chart -> Overall Sales According to Date
        overall_sales = df.groupby('date')['profit'].sum().reset_index()
        fig = px.line(overall_sales, x='date', y='profit', title='Overall Sales Over Time')
        charts['overall_sales'] = pio.to_json(fig)

        # 3) Avg Number of Product Sold (according to brand) per Week
        avg_products_sold = df.groupby(['brand', 'week_label'])['number_of_product'].mean().reset_index()
        fig = px.bar(avg_products_sold, x='week_label', y='number_of_product', color='brand',
                     title='Average Number of Products Sold per Week by Brand')
        fig.update_xaxes(type='category')
        charts['avg_products_sold'] = pio.to_json(fig)

        # 4) Top or Bottom Model Product of All Brands
        top_bottom_model = df.groupby(['brand', 'model'])['profit'].sum().reset_index()
        top_bottom_model = top_bottom_model.sort_values('profit', ascending=False)
        top_model = top_bottom_model.groupby('brand').head(1)
        bottom_model = top_bottom_model.groupby('brand').tail(1)
        fig = px.bar(pd.concat([top_model, bottom_model]), x='model', y='profit', color='brand',
                     title='Top and Bottom Model Products for Each Brand')
        charts['top_bottom_model'] = pio.to_json(fig)

        # 5) Price vs Sale
        fig = px.scatter(df, x='sell_price', y='profit', color='brand', title='Price vs Sale')
        charts['price_vs_sale'] = pio.to_json(fig)

        # 6) Pie Chart -> Distribution of Number of Products Sold by Brand
        fig = px.pie(df, names='brand', values='number_of_product', title='Distribution of Number of Products Sold by Brand')
        charts['pie_chart'] = pio.to_json(fig)

        return jsonify(charts)
if __name__ == '__main__':
    app.run(port=5000, debug=True)

