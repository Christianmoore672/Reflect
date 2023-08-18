




const apiUrl = "https://localhost:7084";

export const login = (userObject) => {
  return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
  .then((r) => r.json())
    .then((userProfile) => {
      if(userProfile.id){
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        return userProfile
      }
      else{
        return undefined
      }
    });
};

export const logout = () => {
      localStorage.clear()
};

export const register = (userObject, password) => {
  return  fetch(`${apiUrl}/api/userprofile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUserProfile) => {
      localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
    });
};

export const getAllUserProfiles = () => {
  return fetch(`${apiUrl}/api/userprofile`)
  .then((response) => response.json())
};

export const getUserProfileById = (id) => {
  return fetch(`${apiUrl}/api/userprofile/${id}`)
  .then((response) => response.json())
};

export const uploadUserProfileImage = (singleImage) => {
  const formData = new FormData();
  formData.append("image", singleImage)
  return fetch(`${apiUrl}/api/UserProfile/upload-image`, {
      method: "POST",
      body: formData,
  })
}
export const editUserProfile = (userProfile) => {
  //make sure your parameter matches the one you are sending to the API
  return fetch(`${apiUrl}/api/UserProfile/${userProfile.Id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
  })
}





// return (
//   <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register,  }}>
//      {props.children}
//   </UserProfileContext.Provider>
// );