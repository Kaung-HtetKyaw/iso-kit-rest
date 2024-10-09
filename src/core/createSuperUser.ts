import bcrypt from 'bcryptjs';
import { createServices, DatabaseClientManager } from '../data-operations';
import { UserSchema } from '../data-operations/services/user/documents';

const defaultUserData = {
    isActive: true,
    isSuperUser: true,
};

const createSuperUser = async (username: string, email: string, password: string): Promise<void> => {
    const databaseClientManager = new DatabaseClientManager();

    const [, operations] = await createServices(databaseClientManager);

    

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const payload = UserSchema.safeParse({ ...defaultUserData, name: username, email, username });

    if (!payload.success) {
        console.log(payload.error.issues);
        return;
    }

    const user = await operations.createUser(payload.data);

    await operations.updateUserPassword(user._id, hashedPassword);
    await databaseClientManager.closeAll();
};

export default createSuperUser;
