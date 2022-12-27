import cookieParser from "cookie-parser";
import { userModel } from "./util/collection";

const user = await userModel.findOne({ email: email })
if (user) {
    const use = await bcrrypt.compare(paasword, user.passwrd)

    if (use) {
        toke = jwt.sign({ userId: user._id }, secret_key, { maxAge })
        res.cookies("jwt", toke ,{
        })
        res.status(200).json({userId:user._id, satus:true})
  

    }
}