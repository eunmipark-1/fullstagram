import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middleware';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
	schema,
	context: ({ request }) => ({ request, isAuthenticated }),
});
const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};
app.use(cors(corsOptions));

server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.start({ port: PORT }, () => console.log(`✅ Server running on http://localhost:${PORT}`));
