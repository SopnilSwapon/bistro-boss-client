
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="Lg:w-4/12 md:w-3/12 mx-auto text-center my-10">
            <p className="text-yellow-600 font-bold">{subHeading}</p>
            <h2 className="text-3xl font-bold border-y-4 my-3 py-2 uppercase">{heading}</h2>
        </div>
    );
};

export default SectionTitle;