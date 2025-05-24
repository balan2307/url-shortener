import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {

     const navigate=useNavigate()
    const [longUrl,setLongUrl]=useState("")

    function handleSubmit(e:React.FormEvent){
        e.preventDefault()
        if(longUrl) navigate(`/auth?createNew='${longUrl}`)

    }
  return (
    <div className="flex flex-col items-center">
      <h2
        className="my-10 sm:my-16 text-3xl 
      sm:text-6xl lg:text-7xl text-white text-center"
      >
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>

      <form
        action=""
        className="flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
        onSubmit={(e)=>handleSubmit(e)}
      >
        <Input placeholder="Enter URL to be shortened" onChange={(e)=>setLongUrl(e.target.value)}></Input>
        <Button type="submit" variant="destructive">
          Shortener!!
        </Button>
      </form>

      <img
        src="/banner.jpeg"
        className="w-full my-11 md:px-11"
        alt="banner"
      ></img>

      <Accordion type="single" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="cursor-pointer">
            Is it styled?
          </AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="cursor-pointer">
            Is it animated?
          </AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
