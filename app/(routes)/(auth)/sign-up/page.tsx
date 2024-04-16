import { SignUp } from "@clerk/nextjs";


const SignUpPage = () => {
    return (  
        <div className="h-full w-full flex items-center justify-center">
            <SignUp signInUrl="/sign-in"/>
        </div>
    );
}
 
export default SignUpPage;