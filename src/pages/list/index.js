import Header from "@/components/Layout/Header";
import { useRouter } from "next/router";
import axios from "axios";

import React, { useState, useEffect } from "react";
import InvitePopup from "./InvitePopup";

export default function Index() {
  // 유저 리스트 관련
  const [userid, setUserId] = useState("");
  const [list, setList] = useState([]);
  const router = useRouter();

  // 로컬스토리지 저장 여부에 따라 페이지 이동, 값 저장
  useEffect(() => {
    if (localStorage.getItem("login")) {
      const userid = JSON.parse(localStorage.getItem("login")).userid;
      setUserId(userid);
    } else {
      router.push("/login/signIn");
    }
  }, []);

  useEffect(() => {
    getList();
  }, [userid]);

  console.log("로그인중인 아이디 ===>", userid);
  const getList = async () => {
    // 로그인 상태 시 쿼리 쏴서 화면에 구현
    const res = await axios.post("/api/list", {
      url: "getList",
      userid: userid,
    });
    // query문으로 result가 정상적으로 넘어오는 경우
    // console.log(res.data);
    if (res.data.length > 0) {
      setList(res.data);
    }
  };

  // 팝업 관련
  const [open, setOpen] = useState(false);
  const inviteMessage = (param) => {
    // 회원 목록 클릭 시 그룹 초대하기 InvitePopup 팝업창 오픈
    console.log("param ===> ", param);
    if (param == "크루원" || param == "초대대기") {
      alert("초대대기 또는 초대완료된 회원에게는 초대장을 보낼 수 없습니다.");
      return;
    }

    if (!open) {
      setOpen(true);
    }
    const close = (param) => {
      console.log("param: ", param);
      // const { status } = param;
      if (close) {
        setOpen(false);
      }
    };
  };

  return (
    <>
      {open ? <InvitePopup onClose={close} /> : null}
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
                        <tr
                          key={i}
                          onClick={() =>
                            inviteMessage(v.status, v.user_id, v.group_id)
                          }
                        >
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
