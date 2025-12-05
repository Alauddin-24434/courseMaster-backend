import { IUser } from "@/interfaces/user.interface"; // তোমার user interface

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // user middleware থেকে attach করা হয়
    }
  }
}
