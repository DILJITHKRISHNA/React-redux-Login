import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";


import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteUser, LoadUserList } from "../../../Api/AdminApi";
import { ToastContainer, toast } from "react-toastify";


 
const TABLE_HEAD = ["No","Name", "Email", "Number", "Actions", ];
 

 
export default function AdminDash() {
  const [user,setUser] = useState([])
  const [search,setSearch] = useState('')


 useEffect(()=>{
     LoadUserList().then((res)=>{
        const userList = res.data.userdata
        console.log();
        setUser(userList)
     }).catch((err)=>{
      console.log(err);
     })
 },[])

 //=================== SEARCH INPUT HANDLER===========================//

 const handleSearchInput = (e) =>{
    setSearch(e.target.value)
 }

//===================== SEACHED DATA FETCHING  ============//

const userDatas =  user.filter((user)=>{
  const searchLowerCase = search.toLowerCase();
const EmailMatch = user.email.toLowerCase().includes(searchLowerCase)
const nameMatch =  user.userName.toLowerCase().includes(searchLowerCase)
const phoneMatch = user.mobile.toString().includes(searchLowerCase)

   return EmailMatch||nameMatch||phoneMatch
})


//==========================DELETE USER ===============================//

    const  handleDelete =async (userId)=>{
  
     DeleteUser(userId).then((res)=>{
        setUser(user.filter((user=>user._id!==userId)))
        toast(res.data.alert)
     }).catch((err)=>{
      console.log(err);
     })
}

  const navigate = useNavigate()

  return (
    <div className="pt-5">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Admin Dashboard</h1>
      </div>
      <div className="container mx-auto mt-5 flex items-center justify-between gap-4">
        <Button
          onClick={() => {
            navigate('/admin/addUser');
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full flex items-center gap-2"
        >
          <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Member
        </Button>
        <div className="w-72">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            value={search}
            onChange={handleSearchInput}
          />
        </div>
      </div>
      <div className="container mx-auto mt-8 overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="py-2 px-4 bg-blue-100 border-b border-blue-200 font-semibold text-gray-800"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userDatas.map((values, index) => {
              const isLast = index === userDatas.length - 1;
  
              return (
                <tr key={values._id} className={`${isLast ? '' : 'border-b border-blue-100'}`}>
                  <td className="py-2 px-4">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4">
                    {values.userName}
                  </td>
                  <td className="py-2 px-4">
                    {values.email}
                  </td>
                  <td className="py-2 px-4">
                    {values.mobile}
                  </td>
                  <td className="py-2 px-4 flex items-center gap-4">
                    <Tooltip content="Edit User">
                      <IconButton
                        variant="text"
                        className="hover:text-blue-600"
                        onClick={() => {
                          navigate(`/admin/edituser/${values._id}`);
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Button
                      onClick={() => {
                        handleDelete(values._id);
                      }}
                      variant="outlined"
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="container mx-auto mt-4 flex items-center justify-between gap-2">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            className="hover:bg-blue-500 hover:text-white"
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            className="hover:bg-blue-500 hover:text-white"
          >
            Next
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
  
}

