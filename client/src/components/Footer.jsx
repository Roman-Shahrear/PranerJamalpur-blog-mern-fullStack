import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsDiscord, BsDribbble } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div className="mt-5">
                    <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                        <span className="px-2 py=1 bg-gradient-to-r from-yellow-300 via-green-500 to-blue-300 rounded-lg text-white">প্রাণের জামালপুর</span>
                        Blog
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                    <Footer.Title title="About" />
                    <Footer.LinkGroup col>
                        <Footer.Link 
                        href="/projects"
                        target="_blank"
                        rel="noopener noreferer">
                           Praner Jamlpur Projects
                        </Footer.Link>
                        <Footer.Link 
                        href="/about"
                        target="_blank"
                        rel="noopener noreferer">
                            Praner Jamalpur
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title="Follow Us"  className="teal-500"/>
                    <Footer.LinkGroup col>
                        <Footer.Link 
                        href="www.facebook.com/praanerJamlpur"
                        target="_blank"
                        rel="noopener noreferer">
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
                    <Footer.Title title="Legal" />
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
                <Footer.Copyright
                    href="#"
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
