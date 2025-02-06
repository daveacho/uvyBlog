export default function Filter ({handlefilter}) {

    return <form className="flex items-center justify-center m-8">
             <select onChange={(e) =>handlefilter(e.target.value)} className="w-96 rounded-md p-2 focus:outline-none" >
              <option value="All">All notes</option>
              <option value="PROGRAMMING">Programming</option>
              <option value="CLOUD">Cloud</option>
              <option value="DEVOPS">Devops</option>
            </select>
           </form>

}