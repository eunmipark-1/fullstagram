import { generateSecret, sendSecretMail } from '../../../util';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		requestSecret: async (_, args, { request }) => {
			console.log(request.user);
			const { email } = args;
			const loginSecret = generateSecret();
			try {
				throw Error();
				await sendSecretMail(email, loginSecret);
				await prisma.updateUser({ data: { loginSecret }, where: { email } });
				return true;
			} catch (e) {
				console.log(e);
				return false;
			}
		},
	},
};
