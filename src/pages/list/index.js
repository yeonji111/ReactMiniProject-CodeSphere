import Header from "@/components/Layout/Header";
import { useRouter } from "next/router";
import axios from "axios";

import React, { useState, useEffect } from "react";

export default function Index() {
  const [userid, setUserId] = useState("");
  const [list, setList] = useState([]);
  const router = useRouter();

  // 로컬스토리지 저장 여부에 따라 페이지 이동, 값 저장
  useEffect(() => {
    if (localStorage.getItem("login")) {
      const userid = JSON.parse(localStorage.getItem("login")).userid;
      setUserId(userid);
      // console.log(userid);
    } else {
      router.push("/login/signIn");
    }
    getList();
  }, []);

  const getList = async () => {
    // 로그인 상태 시 쿼리 쏴서 화면에 구현
    const res = await axios.post("/api/list", {
      url: "getList",
      userid: userid,
    });
    // console.log(res.data); // 배열임

    // query문으로 result가 정상적으로 넘어오는 경우
    // setList
    console.log(res.data);
    if (res.data.length > 0) {
      setList(res.data);
    }
  };

  // console.log("=====>", list); // 배열임

  return (
    <>
      <Header />
      <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">
                커뮤니티 회원 목록
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full cursor-pointer">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Field</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Location
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Intro</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Invite</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {list.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center">{v.user_name}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center">{v.user_field}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center font-medium text-green-500">
                              {v.user_location}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center font-medium">
                              {v.user_intro}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center font-medium">
                              {v.status}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
