import axios from 'axios';

const throughMiddleware = axios.create();

const RequestHandler = async (request) => {
	const response = await axios.get('https://hms-backend-recreate.herokuapp.com/token');
	request.headers.Authorization = `Bearer ${response.data.accessToken}`;

	return request;
};

const responseHandler = (response) => {
	if (response.status === 401) {
		window.location = '/';
	}
	return response;
};

const errorHandler = (error) => {
	// window.location.href = '/';
	// localStorage.removeItem('isLogin');

	return Promise.reject(error);
};

throughMiddleware.interceptors.request.use(
	(request) => RequestHandler(request),
	(error) => errorHandler(error)
);

throughMiddleware.interceptors.response.use(
	(response) => responseHandler(response),
	(error) => errorHandler(error)
);
export default throughMiddleware;
