import Booking from "@/pages/user/Booking";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
    {
      title: "History",
      items: [
        {
          title: "Booking",
          url: "/user/bookings",
          component: Booking
        }
      ],
    },
    
  ]