
import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,

  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

export default function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const nav = useNavigate();


  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="fixed top-19 z-10 bg-[#032531] h-[calc(100vh-2rem)] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none">
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              {/* <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix> */}
              <Typography color="white" className="mr-auto font-normal">
                Movies
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={() => nav('/movie/popular')} className="text-white">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Popular
              </ListItem>
              <ListItem onClick={() => nav('/movie/upcoming')} className="text-white">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Upcoming
              </ListItem>
              <ListItem onClick={() => nav('/movie/top_rated')} className="text-white">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Top Rated
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              {/* <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix> */}
              <Typography color="white" className="mr-auto font-normal">
                Tv Shows
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={() => nav('/tv/popular')} className="text-white">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Popular
              </ListItem>
              <ListItem onClick={() => nav('/tv/airing_today')} className="text-white">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Airing Today
              </ListItem>
              <ListItem onClick={() => nav('/tv/on_tv')} className="text-white">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                On Tv
              </ListItem>
              <ListItem onClick={() => nav('/tv/top_rated')} className="text-white">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Top Rated
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
}