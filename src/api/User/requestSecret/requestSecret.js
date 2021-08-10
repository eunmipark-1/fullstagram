import { generateSecret } from '../../../util';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		requestSecret: async (_, args) => {
			const { email } = args;
			const loginSecret = generateSecret();
			try {
				await prisma.updateUser({ data: { loginSecret }, where: { email } });
				return true;
			} catch (e) {
				console.log(e);
				return false;
			}
		},
	},
};
