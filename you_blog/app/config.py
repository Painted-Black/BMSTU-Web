class Configuration(object):
	DEBUG = True
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://blog:maria@localhost/blogdb'
			# dialect+driver://username:password@host:port/database
	SECRET_KEY = 'top secret'
	### Flask security ###
	SECURITY_PASSWORD_SALT = 'salt'
	SECURITY_PASSWORD_HASH = 'bcrypt'
