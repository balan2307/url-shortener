import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

interface User {
  name:string,
  email:string,
  password:string,
  profile_pic:string
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}

export async function signUp(user:User){

  const fileName=`dp-${user.name.split(" ").join("-")}-${Math.random()}`


  const {error:storageError}=await supabase.storage.from("profile-pic").upload(fileName,user.profile_pic);

  if(storageError) throw new Error(storageError.message);

  const {data,error}=await supabase.auth.signUp({
    email:user.email,
    password:user.password,
    options:{
      data:{
        name:user.name,
        profile_pic:`${supabaseUrl}/storage/v1/object/public/profile-pic/${fileName}`
      }
      

    }

  })

  if(error) throw error.message;
  return data


}



export async function signOut(){

  const {error}=await supabase.auth.signOut();
  if(error) throw Error(error.message)
}
