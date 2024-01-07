import pandas as pd
import numpy as np
df = pd.read_csv("final_perfume_data.csv")

df['Price'] = np.random.randint(200, 400, df.shape[0])


df.loc[df['Brand'] == "Parfums de Marly", 'Price'] = 335
df.loc[df['Brand'] == "Le Labo", 'Price'] = 322
le_labo_rows = df[df["Brand"] == "Le Labo"]
num_le_labo= len(le_labo_rows)

df.loc[df['Brand'] == "Xerjoff", 'Price'] = 300
mfk_rows = df[df["Brand"] == "Maison Francis Kurkdjian"]
num_mfk_rows = len(mfk_rows)
random_prices = np.random.randint(300, 400, num_mfk_rows)

df.loc[df["Brand"] == "Maison Francis Kurkdjian", "Price"] = random_prices

df.to_csv("final_perfume_data_with_prices.csv", index=False)
