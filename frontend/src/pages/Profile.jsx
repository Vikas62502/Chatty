import { useState } from 'react'
import { use_auth_store } from '../store/use_auth_store'
import { Camera, Mail, User } from 'lucide-react'

const Profile = () => {
  const { auth_user, is_updating_profile, update_profile } = use_auth_store()
  const [selected_img, set_selected_img] = useState(null)
  const formatted_date = new Date(auth_user.createdAt).toLocaleDateString('en-GB')
    // Format date to dd/mm/yyyy
  const handle_img_upload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64Image = reader.result
      set_selected_img(base64Image)
      await update_profile({ profile_pic: base64Image })
    }
  }

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selected_img || auth_user.profile_pic || "/gawr.jpg"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${is_updating_profile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handle_img_upload}
                  disabled={is_updating_profile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {is_updating_profile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{auth_user?.user_name}</p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{auth_user?.email}</p>
            </div>
          </div>
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{formatted_date?.split('T')[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile