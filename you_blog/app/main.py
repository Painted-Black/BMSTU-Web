import sys
from app import app, db
import view
from posts.blueprint import posts

app.register_blueprint(posts, url_preffix='/blog')

if __name__ == "__main__":
	app.run()
