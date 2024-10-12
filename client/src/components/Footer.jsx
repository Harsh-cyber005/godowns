import Logo from "./Logo";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-[#192439] dark:text-white p-4 text-black pt-10">
            <div className="mb-10 md:mb-4 w-full flex items-center md:justify-start justify-center">
                <Logo/>
            </div>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center">
                    <span className="text-sm">© {new Date().getFullYear()} Stark Storage Solutions Private Limited. All rights reserved.</span>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="text-sm hover:underline">About Us</a>
                    <a href="#" className="text-sm hover:underline">Contact</a>
                    <a href="#" className="text-sm hover:underline">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
