export default function Filter ({handlefilter}) {

    return <form className="flex items-center justify-center m-8">
             <select onChange={(e) =>handlefilter(e.target.value)} className="w-96 rounded-md p-2 focus:outline-none" >
              <option value="All">All notes</option>
              <option value="BUSINESS">Business</option>
              <option value="PERSONAL">Personal</option>
              <option value="IMPORTANT">Important</option>
            </select>
           </form>

}