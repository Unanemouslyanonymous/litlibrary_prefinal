"use client";

import { useState, useEffect, useContext } from "react";
import Book from "../../components/Book";
import { Search } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { user, isAuthenticated } = authContext;
  const [searchQuery, setSearchQuery] = useState<string>("Harry Potter");
  const [books, setBooks] = useState<any>();

 
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/books/search`,
        { params: { searchQuery } }
      );
      setBooks(response.data);
      console.log("frntedn data", response.data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?origin=dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Dashboard</h1>
      <div className="flex justify-center relative">
        <div className="relative flex flex-row items-center z-10 min-w-[40vw] w-[60%] bg-slate-300 dark:bg-zinc-700/30 border-1 border-slate-200 shadow-lg focus:border-purple-500 focus:border-2 rounded-full min-h-16 md:h-[calc(0.25*18rem)]">
          <Search
            size={30}
            strokeWidth={2}
            className="flex mx-4 text-zinc-700"
          />
          <input
            type="text"
            placeholder="Search the Book of Your Choice"
            value={searchQuery}
            onClick={() => setSearchQuery("")}
            onChange={handleSearchChange}
            className="bg-transparent absolute h-full focus:outline-none focus:ring-0 ml-14 w-[80%]"
          />
          <Button
            color="blue"
            onClick={handleSearch}
            className="absolute right-4 rounded-full"
          >
            Search
          </Button>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center items-start gap-2">
        {books ?
          books.map((book: any, index: number) => (
            <Book key={index} book={book} />
          ))
        :
          <div className="text-2xl font-semibold flex justify-center" >No books found, Please Enter Search</div>
        }
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>*/}
    </div>
  );
};

export default Dashboard;
