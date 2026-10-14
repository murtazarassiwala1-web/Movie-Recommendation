# 🎬 Movie Recommendation System

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-Backend-green.svg)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-Scikit--Learn-orange.svg)
![HTML/JS](https://img.shields.io/badge/Frontend-HTML/JS-yellow.svg)

An end-to-end, content-based movie recommendation system built with Python, Scikit-learn, and Flask. The application analyzes movie metadata (genres, keywords, cast, and crew) to suggest the top 5 most similar movies based on a user's selection, and fetches real-time movie posters using the TMDB API.

---

## 🌟 Features
* **Content-Based Filtering:** Uses Cosine Similarity and Bag-of-Words (CountVectorizer) to find mathematically similar movies.
* **Live Poster Fetching:** Integrates the TMDB API to display high-quality movie posters dynamically.
* **Instant Search:** Features a highly optimized, debounced JavaScript search bar for instantly filtering through 4,800+ movies.
* **Clean UI:** Built with HTML, CSS, and Bootstrap 5 for a responsive, modern interface.

---

## 🛠️ Tech Stack
* **Data Processing & ML:** Python, Pandas, NumPy, Scikit-learn, NLTK (PorterStemmer)
* **Backend:** Flask
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (with Debouncing), Bootstrap 5
* **API:** The Movie Database (TMDB) API
* **Data Source:** TMDB 5000 Movies & Credits Dataset

---

## ⚙️ How It Works (The Architecture)

1. **Data Preprocessing:** Extracts relevant features (genres, cast, director, keywords) from JSON-like strings using Python's `ast` module.
2. **Text Vectorization:** Combines all tags into a single string per movie, applies stemming, and creates a numerical matrix using `CountVectorizer`.
3. **Similarity Matrix:** Calculates the `cosine_similarity` between all 4,800 movie vectors.
4. **Serialization:** Exports the trained models as `.pkl` files using `pickle` for fast loading in the Flask backend.
5. **Web Serving:** Flask handles the user's POST request, calculates the nearest neighbors, fetches poster URLs from TMDB, and renders the frontend template.

---

## 🚀 Getting Started

### Prerequisites
* Python 3.8 or higher
* A free API Key from [TMDB](https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/movie-recommender.git](https://github.com/your-username/movie-recommender.git)
   cd movie-recommender
