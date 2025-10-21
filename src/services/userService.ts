import dbConnect from "@/lib/client";
import User, { IUser, IUserInput } from "@/models/User";




class UserService {
    // DB connection check
    private async checkDbConnection(): Promise<void> {
        await dbConnect();
    }


    // Create a new user
    async createUser(userData: IUserInput): Promise<IUser> {
      await this.checkDbConnection();
      const user = new User(userData);
      return await user.save();
    }
}



export default UserService;



