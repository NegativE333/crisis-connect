import { SignIn } from "@clerk/nextjs";


const SignInPage = () => {
    return (  
        <div className="h-full w-[95%] sm:w-full flex items-center justify-center">
            <SignIn />
        </div>
    );
}
 
export default SignInPage;