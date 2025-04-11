import * as bcrypt from 'bcrypt';
export class HashingHelper {
    static async hashData(data:string) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(data,salt);
    }
    static async compareData(data:string,hashedData:string) {
        return await bcrypt.compare(data, hashedData);
    }
}