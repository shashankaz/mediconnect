export const metadata = {
  title: "Add Doctor",
};

interface AddDoctorLayoutProps {
  children: React.ReactNode;
}

const AddDoctorLayout: React.FC<AddDoctorLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AddDoctorLayout;
