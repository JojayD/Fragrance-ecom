import pandas as pd
import numpy as np
df = pd.read_csv("final_perfume_data.csv")

df['Price'] = np.random.randint(200, 400, df.shape[0])


df.loc[df['Brand'] == "Parfums de Marly", 'Price'] = 335
df.loc[df['Brand'] == "Le Labo", 'Price'] = 322
df.loc[df['Brand'] == "Xerjoff", 'Price'] = 300


df.to_csv("final_perfume_data_with_prices.csv", index=False)


    

