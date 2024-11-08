
import   {createUser} from "@/actions/createUser";
import CreateChannel from "@/components/custom/CreateChannel";

const channel = async() => {
  const server = await createUser();
  if(server){
    return (
      <>  
        <CreateChannel />
      </>
    )
  }
  return null;
}

export default channel;

