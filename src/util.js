import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { adjectives, nouns } from './word';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from 'jsonwebtoken';

export const generateSecret = () => {
	const randomNumber = Math.floor(Math.random() * adjectives.length);
	return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = (email) => {
	const options = {
		auth: {
			api_key: process.env.SENDGRID_API_KEY,
		},
	};
	const client = nodemailer.createTransport(sgTransport(options));
	return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
	const email = {
		from: 'mia@naver.com',
		to: address,
		subject: 'Login Secret for Fullstagram',
		html: `Hello! Your login secret is <strong>${secret}</strong>. <br/> Copy paste on the app/website to log in`,
	};
	return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
