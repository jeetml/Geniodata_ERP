import pandas as pd
import random

# Example product names (you should expand this list)
phones = [
    "iPhone 15 Pro",
    "iPhone 15",
    "iPhone 15 Plus",
    "iPhone 14 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14",
    "iPhone 14 Plus",
    "Samsung Galaxy S24 Ultra",
    "Samsung Galaxy S24",
    "Samsung Galaxy S24+",
    "Samsung Galaxy Z Fold 5",
    "Samsung Galaxy Z Flip 5",
    "Samsung Galaxy Note 20 Ultra",
    "Google Pixel 8 Pro",
    "Google Pixel 8",
    "Google Pixel 7 Pro",
    "Google Pixel 7",
    "OnePlus 11",
    "OnePlus 11T",
    "Xiaomi Mi 13 Pro"
]
tvs = [
    "Samsung QN90C Neo QLED",
    "LG C3 OLED",
    "Sony A90J OLED",
    "Samsung Q80T QLED",
    "LG G3 OLED",
    "Sony X95K LED",
    "Samsung S95B OLED",
    "Sony A80J OLED",
    "LG NanoCell 90 Series",
    "Samsung The Frame 2024",
    "TCL 6-Series R655",
    "Hisense U8H",
    "VIZIO P-Series Quantum X",
    "Philips 806 OLED",
    "Panasonic JZ2000 OLED",
    "Samsung Q70A QLED",
    "LG B3 OLED",
    "Sony X85K LED",
    "Samsung TU8000 4K",
    "Sharp Aquos 8K"
]

acs = [
    "LG Dual Inverter Window AC",
    "Samsung Wind-Free AC",
    "Daikin FTKF50TV16U",
    "Mitsubishi MSY-GN18VF",
    "Hitachi Kaze Plus",
    "Blue Star 5HW18JA",
    "Whirlpool 3D Cool Inverter",
    "Voltas 1.5 Ton 5 Star",
    "Carrier Infinity 24K",
    "Panasonic CS/CU-UE18UKY",
    "Godrej 1.5 Ton 5 Star",
    "Haier HSU-18VNSB",
    "O General ASGG18JLCA",
    "Lloyd 1.5 Ton 5 Star",
    "Electrolux 1.5 Ton Inverter",
    "IFB IAC18SC5G",
    "Sanyo SI/SO-18T5SC",
    "Sharp AY-A12DR",
    "Bluestar 3HW18JB",
    "Toshiba RAS-18SKV",
]

washing_machines = [
    "LG Front Load WM3997HWA",
    "Samsung FlexWash WV55M9600A",
    "Whirlpool WFW9620HC",
    "Bosch WAW285H2UC",
    "Maytag MHW8630HC",
    "GE GFW850SPNRS",
    "Electrolux EFLS627UIW",
    "Frigidaire FFTW4120SW",
    "Speed Queen TR7",
    "Miele W1 WWR860",
    "Panasonic NA-FS16V7",
    "Haier HWF80-B1438",
    "LG Top Load WT7900HBA",
    "Samsung WA50R5400AV",
    "Whirlpool WTW8127LC",
    "Bosch WTG86402UC",
    "Maytag MVWX655DW",
    "GE GTW840CSNWS",
    "LG Front Load WM3400CW",
    "Samsung ActiveWater 8.0"
]

laptops = [
    "Apple MacBook Pro 16-inch (2024)",
    "Dell XPS 13",
    "HP Spectre x360 14",
    "Lenovo ThinkPad X1 Carbon Gen 11",
    "Asus ROG Zephyrus G14",
    "Microsoft Surface Laptop 5",
    "Acer Swift 3",
    "Razer Blade 15",
    "LG Gram 17",
    "Apple MacBook Air (M2, 2024)",
    "Dell Inspiron 14",
    "HP Envy 15",
    "Lenovo Yoga 9i",
    "Asus ZenBook 14",
    "Samsung Galaxy Book3 Pro",
    "MSI Prestige 14",
    "Huawei MateBook X Pro",
    "Acer Predator Helios 300",
    "Toshiba Portege X30L-G",
    "Google Pixelbook Go"
]

headphones = [
    "Sony WH-1000XM5",
    "Bose QuietComfort 45",
    "Apple AirPods Max",
    "Sennheiser Momentum 4",
    "Bose 700",
    "Sony WF-1000XM4",
    "Jabra Elite 85h",
    "Beats Studio3 Wireless",
    "Bang & Olufsen Beoplay H95",
    "Shure Aonic 50",
    "AKG N700NC M2",
    "Bose QuietComfort Earbuds",
    "Sony WH-XB910N",
    "Jabra Elite Active 75t",
    "Sennheiser HD 660S",
    "Audio-Technica ATH-M50x",
    "Skullcandy Crusher ANC",
    "Bose SoundLink Around-Ear",
    "Sony WH-H910N",
    "Sennheiser PXC 550-II"
]

# Price ranges for each category
price_ranges = {
    "phones": (30000, 80000),
    "tvs": (50000, 200000),
    "acs": (20000, 60000),
    "washing_machines": (15000, 50000),
    "laptops": (40000, 150000),
    "headphones": (10000, 50000)
}

# Generate product list
products = []
categories = {
    "phones": phones,
    "tvs": tvs,
    "acs": acs,
    "washing_machines": washing_machines,
    "laptops": laptops,
    "headphones": headphones
}

for category_name, category_list in categories.items():
    for model in category_list:
        # Generate only one entry per model
        products.append((category_name, model))

# Define shopping sites
shopping_sites = ["Amazon", "Flipkart", "VijaySales", "Croma", "Snapdeal"]

# Create dataset
data = []
for category_name, product in products:
    base_price = random.randint(*price_ranges[category_name])  # Base price for the product
    row = [product]
    for site in shopping_sites:
        price_variation = random.randint(-5000, 5000)  # Variation in price
        row.append(base_price + price_variation)
    data.append(row)

# Create DataFrame
df = pd.DataFrame(data, columns=["Model"] + shopping_sites)

# Save to CSV
df
