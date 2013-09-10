This is a MEAN stack seed in the works.

To use this seed to develop your modules, simply add them to bower.json and link them in this project, the grunt has been configured to watch all component changes.

Cloudfoundry deployment : 
	cf push -m prod-manifest.yml
Docker deployment (provided /var/mongo-data exists) :
	docker run -v /var/mongo-data:/tmp/mongo -e DATA_DIR=/tmp/mongo your_docker_name/your_docker_mongo_image
	

