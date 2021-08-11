import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../util';

export default {
	Mutation: {
		confirmSecret: async (_, args, { request }) => {
			console.log(request);
			const { email, secret } = args;
			const user = await prisma.user({ email });
			if (user.loginSecret === secret) {
				//JWT
				return generateToken(user.id);
			} else {
				throw Error('Wrong email/secret combination');
			}
		},
	},
};
