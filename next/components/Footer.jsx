import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <div className="p-2 font-sans text-sm left-15 bottom-10">
        &copy; {new Date().getFullYear()} Amr Abed - Built with {" "}
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a>
      </div>
    </Fragment>
  );
};

export default Footer;
