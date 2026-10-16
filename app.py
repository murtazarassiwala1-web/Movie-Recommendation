from flask import Flask, render_template, request
import joblib
import pandas as pd
import requests

app = Flask(__name__)

# Load the saved dictionaries and matrix
movies_dict = joblib.load(open('movie_dict.pkl', 'rb'))
movies = pd.DataFrame(movies_dict)
similarity = joblib.load(open('similarity.pkl', 'rb'))

def fetch_poster(movie_id):
    # Replace YOUR_API_KEY with your actual TMDB API key
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=06f10fc8741a672af455421c239a1ffc&language=en-US"
    response = requests.get(url)
    data = response.json()
    
    # Handle cases where a movie might not have a poster
    poster_path = data.get('poster_path')
    if poster_path:
        return "https://image.tmdb.org/t/p/w500/" + poster_path
    else:
        return "https://via.placeholder.com/500x750?text=No+Poster"

def recommend(movie):
    try:
        movie_index = movies[movies['title'] == movie].index[0]
        distances = similarity[movie_index]
        movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
        # print(enumerate(distances))
        recommended_movies = []
        recommended_movie_posters = []
        
        for i in movies_list:
            movie_id = movies.iloc[i[0]].movie_id
            recommended_movies.append(movies.iloc[i[0]].title)
            recommended_movie_posters.append(fetch_poster(movie_id))
            
        return recommended_movies, recommended_movie_posters
    except IndexError:
        return [], []

@app.route('/', methods=['GET', 'POST'])
def index():
    # Pass all movie titles to populate the dropdown
    movie_titles = movies['title'].values.tolist()
    recommendations = None

    if request.method == 'POST':
        selected_movie = request.form.get('movie_name')
        names, posters = recommend(selected_movie)
        
        if names:
            # zip() allows us to loop through both lists simultaneously in HTML
            recommendations = zip(names, posters)

    return render_template('index.html', movies=movie_titles, recommendations=recommendations)

if __name__ == '__main__':
    app.run(debug=True)