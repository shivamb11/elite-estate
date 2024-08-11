function Contact() {
  return (
    <div className="flex flex-col lg:h-[calc(100vh-112px)] lg:flex-row">
      <div className="mb-10 flex h-1/2 w-full flex-col gap-12 pb-10 md:mb-0 lg:h-full lg:w-3/5 lg:overflow-auto lg:pr-12">
        <div className="flex flex-col gap-10">
          <h2 className="text-2xl font-light xs:text-2xl">Contact Us</h2>
          <ul className="flex flex-col justify-between gap-8">
            <li className="flex items-center">
              <span className="w-1/3">Email Id:</span>
              <span>shivamsb2003@gmail.com</span>
            </li>
            <li className="flex items-center">
              <span className="w-1/3">Contact Number:</span>
              <span>+91 12345 12345</span>
            </li>
          </ul>
          <p>Feel free to reach us !</p>
        </div>
      </div>

      <div className="flex h-1/2 items-center lg:h-full lg:w-2/5 lg:bg-orange-50">
        <img
          className="mx-auto size-20 opacity-50 lg:size-60"
          src="contact.png"
          alt="contact"
        />
      </div>
    </div>
  );
}

export default Contact;
