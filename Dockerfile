# 1. Base image set karein (Python 3.9 lightweight version)
FROM python:3.9-slim

# 2. Container ke andar working directory banayein
WORKDIR /app

# 3. requirements.txt file ko copy karein aur libraries install karein
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Baaki saara project code (jinme aapka similarity.pkl bhi shamil hai) copy karein
COPY . .

# 5. Port expose karein (Agar Streamlit use kar rahe hain toh 8501, Flask ke liye 5000)
EXPOSE 8501

# 6. Container start hone par run hone wali command
# Agar aap app.py ko Streamlit se chala rahe hain:
CMD gunicorn app:app --bind 0.0.0.0:10000
#CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]

# Agar simple Flask script hai toh is line ko use karein aur upar wala CMD hata dein:
# CMD ["python", "app.py"]
