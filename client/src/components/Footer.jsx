import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsDiscord, BsDribbble } from "react-icons/bs";
import pranerjamalpur from '../images/pranerjamalpur.svg';
export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div>
                    <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                        <span className="px-2 py=1 my-4"><img className="w-13 rounded-full border-2 border-green-400" src={pranerjamalpur} alt="pranerjamalpur" /></span>
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-10 sm:grid-cols-3 sm:gap-6 font-bold text-black-100">
                    <div>
                    <Footer.Title title="About" className="font-bold text-black-100" />
                    <Footer.LinkGroup col>
                        <Footer.Link
                        href="/projects"
                        // target="_blank"
                        rel="noopener noreferrer">
                           Praner Jamlpur Projects
                        </Footer.Link>
                        <Footer.Link 
                        href="/about"
                        // target="_blank"
                        rel="noopener noreferrer">
                            Praner Jamalpur
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title="Follow Us" className="font-bold text-black-100" />
                    <Footer.LinkGroup col>
                        <Footer.Link 
                        href="www.facebook.com/praanerJamlpur"
                        target="_blank"
                        rel="noopener noreferrer">
                            Facebook Page
                        </Footer.Link>
                        <Footer.Link 
                        href="#"
                        target="_blank"
                        rel="noopener noreferer">
                            Facebook Group
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title="Legal" className="font-bold text-black-100" />
                    <Footer.LinkGroup col>
                        <Footer.Link 
                        href="#"
                        >
                            Privecy Policy
                        </Footer.Link>
                        <Footer.Link 
                        href="#"
                        >
                            Terms &amp; Conditions
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider className="border-teal-500"/>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright className="text-black-100 cursor-pointer"
                    href="https://www.linkedin.com/in/roman-shahrear-016155248/"
                    target="_blank"
                    rel="noopener noreferrer"
                    by="প্রাণের জামালপুর Blog Developed By Shahrear"
                    year={new Date().getFullYear()}
                />
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href="#" icon={BsFacebook} />
                    <Footer.Icon href="#" icon={BsInstagram} />
                    <Footer.Icon href="#" icon={BsTwitter} />
                    <Footer.Icon href="#" icon={BsDribbble} />
                    <Footer.Icon href="#" icon={BsDiscord} />
                </div>
            </div>
        </div>
    </Footer>
  );
}
