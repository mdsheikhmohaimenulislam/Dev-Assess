import CompanyProfile from "@/components/layouts/company/CompanyProfile";


export default function CompanyProfilePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Company Profile</h1>

      <CompanyProfile />
    </div>
  );
}


// {data?.data && (
//   <UpdateCompanyForm
//     company={data.data}
//     onSuccess={() => {
//       // modal close / message etc.
//     }}
//   />
// )}



{/* <DeleteCompany
  id={company.id}
  onSuccess={() => {
    // profile deleted
  }}
/> */}