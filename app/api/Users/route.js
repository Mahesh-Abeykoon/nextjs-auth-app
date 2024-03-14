import User from "@/app/model/User";
import { NextResponse }  from "next/server"
import bcrypt from "bcrypt";

export async function POST(req){
    try {
        const body = await req.json();
        const userData = body.formData;
        
        //confirm data exists
        if(!userData?.email || !userData.password){
            return NextResponse.json(
                { message: "All fields are Required." },
                { status: 400 }
            );
        }
       //check duplicate emails 
       const duplicate = await User.findOne({ email:userData.email })
       .lean()
       .exec();

       if(duplicate){
        return NextResponse.json(
            { message: "Duplicate Email" }, { status:  409} )}

        const hashPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashPassword;

        await User.create(userData)
        return NextResponse.json({message:"User Created."}, {status: 201})

        }catch(error) {
        console.log(err)
        return NextResponse.json({message: "Error", err }, { status: 500 });
    }
}