"use client"

import React, { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import "./Right.css"
import {
  BsBookmark,
  BsBookmarkFill,
  BsFillLockFill,
  BsFillUnlockFill
} from "react-icons/bs"
import { AiOutlineDownload, AiOutlineInfoCircle, AiFillEdit } from "react-icons/ai"
import { StateContext } from "../../../StateProvider"
import { BiHelpCircle } from "react-icons/bi"
import { useRouter } from "next/navigation"
import { FiSettings } from "react-icons/fi"
const Right = ({
  setDB,
  db,
  personalisedDBO,
  setPersonalisedDBO,
  setIsPersonalisedDBO,
  setSelectedPersonalisedDBO,
  selectedPersonalisedDBO,
  unLockedPersonalisedDBo,
  setUnLockedPersonalisedDBo,
  lockedDBOs,
  setLockedDBOs
}) => {
  const [DBos, setDBos] = React.useState([])
  const router = useRouter()
  const { best_DBos, setBest_DBos, fileName, fileData, best_DBos_SVGs, setBest_DBos_SVGs } = React.useContext(StateContext)


  // const [personalisedDBOSVGs, setPersonalisedDBOSVGs] = React.useState([])

  // const getPersonalisedDBO = async () => {
  //   const svgPromises = personalisedDBO.map(async dboArray => {
  //     dboArray.forEach(async dbo => {)
  //     setPersonalisedDBOSVGs(
  //       svgResults.map((svg, index) => ({
  //         svg,
  //         index,
  //         vis: personalisedDBO[index].vis
  //       }))
  //     )
  //   })
  // }

  // React.useEffect(() => {
  //   getPersonalisedDBO()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [personalisedDBO])
  const [isPersonalisedSelected, setIsPersonalisedSelected] = useState(false)

  const [evalutationData, setEvalutationData] = useState([])

  useEffect(() => {
    if (evalutationData && evalutationData?.length > 0) {
      const modal = document.getElementById("my_modal_8")
      if (modal) {
        modal.showModal()
      }
    }
  }, [evalutationData])

  useEffect(() => {
    if (best_DBos_SVGs && best_DBos_SVGs?.length > 0) {
      setDBos(best_DBos_SVGs)
    }
  }, [best_DBos_SVGs])

  return (
    <main className="flex flex-col justify-between h-full items-center gap-3 w-max">
      <Modal1 />
      <Modal2 />
      <Modal3 />
      <Modal4 />
      <Modal5 />
      <Modal6 data={evalutationData} />
      <div className="flex gap-2">
        <button
          className={`btn ${isPersonalisedSelected ? "btn-outline" : ""
            } btn-primary flex justify-center items-center tooltip tooltip-left`}
          style={{ textTransform: "none" }}
          onClick={e => {
            setIsPersonalisedSelected(false)
          }}
          data-tip="These are 5 dashboards that are initially recommended using metadata and user preferences."
        >
          Best DBOs
          <AiOutlineInfoCircle className="self-center" />
        </button>
        <button
          className={`btn ${isPersonalisedSelected ? "" : "btn-outline"
            } btn-primary tooltip flex justify-center items-center gap-2 tooltip-left`}
          style={{ textTransform: "none" }}
          onClick={e => {
            setIsPersonalisedSelected(true)
          }}
          data-tip="These dashboards can be created as per need. You can create maximum 5 personalized dashboards"
        >
          Personalized DBOs
          <AiOutlineInfoCircle className="self-center" />
        </button>
      </div>
      <div className="h-[65vh] overflow-y-auto main-right pr-3 scroll-smooth">
        {isPersonalisedSelected
          ? personalisedDBO.map((element, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-3 mb-5">
                <EachDBOComponentPersonal
                  element={element}
                  setDB={setDB}
                  // svg={svg.svg}
                  // vis={svg.vis}
                  // setSvgs={setSvgs}
                  index={index}
                  setIsPersonalisedDBO={setIsPersonalisedDBO}
                  setSelectedPersonalisedDBO={setSelectedPersonalisedDBO}
                  selectedPersonalisedDBO={selectedPersonalisedDBO}
                  personalisedDBO={personalisedDBO}
                  unLockedPersonalisedDBo={unLockedPersonalisedDBo}
                  setUnLockedPersonalisedDBo={setUnLockedPersonalisedDBo}
                  lockedDBOs={lockedDBOs}
                  setLockedDBOs={setLockedDBOs}
                  setPersonalisedDBO={setPersonalisedDBO}
                  setEvalutationData={setEvalutationData}
                />
              </div>
            )
          })
          : DBos.length > 0 &&
          DBos.map((svg, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-3 mb-5"
              >
                <EachDBOComponent
                  setDB={setDB}
                  svg={svg.fullSVG}
                  setDBos={setDBos}
                  index={index}
                  setIsPersonalisedDBO={setIsPersonalisedDBO}
                  evaluation={svg.info}
                  setEvalutationData={setEvalutationData}
                />
              </div>
            )
          })}
      </div>
      {/* <div className="ratings w-64">
        <h1
          className="text-2xl font-bold text-center text-white flex justify-center items-center gap-2 tooltip tooltip-left"
          data-tip="This user feedback will be used to optimize the dashboard given in the centre"
        >
          Feedback <span className=" text-base">(For DBo- {dbo + 1})</span>
          <AiOutlineInfoCircle className="self-center" />
        </h1>
        <div className="flex justify-center items-center gap-2">
          <p className="italic">(Please rate DBo to improve it)</p>
        </div>
        <>
          <DB_Rating
            dbo={dbo}
            DBO_Ratings={DBO_Ratings}
            setDBO_Ratings={setDBO_Ratings}
          />
        </>
      </div> */}
      <div className="Additional-Help">
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Additional help
        </h1>
        <div className="flex justify-center items-center gap-3">
          <div
            className="tutorial fill-white text-white cursor-pointer rounded-[50%] border-2 border-white w-20 h-20 p-3 flex flex-col justify-center items-center"
            onClick={e => {
              router.push("/Tutorial")
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <p className="font-medium text-xs">Tutorial</p>
          </div>
          <div className="help flex justify-center items-center flex-col fill-white text-white rounded-[50%] border-2 border-w w-20 h-20 p-3">
            <BiHelpCircle className="w-14 h-14" />
            <p className="font-medium w-full text-center text-xs">Help</p>
          </div>
          <div className="dropdown dropdown-top dropdown-hover">
            <label
              tabIndex={0}
              className="help flex justify-center items-center flex-col fill-white text-white rounded-[50%] border-2 border-w w-20 h-20 p-3"
            >
              <FiSettings className="w-14 h-14" />
              <p className="font-medium w-full text-center text-xs">Settings</p>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[9999] absolute menu p-2 shadow bg-secondary h-max rounded-box w-52 bottom-full top-0"
            >
              <li>
                <a className=" text-white">Language: Eng/French</a>
              </li>
              <li>
                <a className="text-white">Feedback</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

const EachDBOComponent = ({
  setDB,
  svg,
  setDBos,
  index,
  setIsPersonalisedDBO,
  evaluation,
  setEvalutationData
}) => {
  const [isSaved, setIsSaved] = React.useState(false)
  const downloadSVG = (svg, fileName) => {
    const blob = new Blob([svg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  }
  const handleDownload = () => {
    downloadSVG(svg, `visualization_${index}.svg`)
  }

  // const [isModal, setIsModal] = React.useState(false);
  // React.useEffect(() => {
  //   if (isModal) {
  //     const modal: any = document.getElementById("my_modal_6");
  //     if (modal) {
  //       modal.showModal();
  //     }
  //   }
  // }, [isModal]);

  return (
    <div className="bg-white shadow-lg rounded-xl">
      <div
        className=""
        onClick={() => {
          setIsPersonalisedDBO(false)
          setDB(index)
        }}
      >
        <div className="px-2 py-2 ">
          <div
            className="h-max w-max svg-container"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      </div>
      <div className="flex w-full justify-around items-center my-1">
        {isSaved ? (
          <BsBookmarkFill
            className="div3 fill-black h-6 w-6 flex justify-center items-center aspect-square"
            onClick={() => setIsSaved(false)}
          />
        ) : (
          <BsBookmark
            className="div3 fill-black h-6 w-6 flex justify-center items-center aspect-square"
            onClick={() => setIsSaved(true)}
          />
        )}
        <AiOutlineInfoCircle
          className={`fill-[#241f44] h-6 w-6 aspect-square`}
          onClick={() => {
            // alert(
            //   ` Evaluation is Match Score: ${evaluation[1]} , Coverage Importance : ${evaluation[2]} , Complexity : ${evaluation[3]} , Fitness : ${evaluation[4]}`
            // );
            setEvalutationData(evaluation)
          }}
        />
        <AiOutlineDownload
          className="div fill-black h-6 w-6 flex justify-center items-center aspect-square"
          onClick={handleDownload}
        />
        <MdDelete
          className="div2 fill-black h-6 w-6 flex justify-center items-center aspect-square"
          onClick={e => {
            e.preventDefault()
            setDBos(prevSvgs => prevSvgs.filter((item, i) => i !== index))
          }}
        />
      </div>
      <p className="font-bold text-[#5A44D5] text-center w-full">
        Dashboard-{index + 1}
      </p>
    </div>
  )
}

const EachDBOComponentPersonal = ({
  element,
  setDB,
  setSvgs,
  index,
  setIsPersonalisedDBO,
  setSelectedPersonalisedDBO,
  selectedPersonalisedDBO,
  personalisedDBO,
  unLockedPersonalisedDBo,
  setUnLockedPersonalisedDBo,
  lockedDBOs,
  setLockedDBOs,
  setPersonalisedDBO,
  setEvalutationData
}) => {
  const [isLocked, setIsLocked] = React.useState(false)
  // console.log(vis)
  const [arrayOfSvgs, setArrayOfSvgs] = useState([]);

  const downloadSVG = () => {
    const FullSVG= document.getElementById(`personaliedDBO-${index}`)?.innerHTML;
    const blob = new Blob([FullSVG], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'combined.svg';
    link.click();
  };

  const handleDownload = () => {
    downloadSVG();
  };

  useEffect(() => {
    if (unLockedPersonalisedDBo === index) {
      setIsLocked(true)
    } else {
      setIsLocked(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unLockedPersonalisedDBo])
  function DBo_evaluation_fxn(
    CO_DBo,
    no,
    len_DA,
    vis_table,
    vis_table_imp,
    meta_data
  ) {
    let CO_DBo_evaluation = []
    let match_DA_list_final = []
    let coverage_DA_count = []
    let coverage_imp = 0
    let complexity = 0

    //let match_sum = 0;
    for (let i = 0; i < CO_DBo?.length; i++) {
      let match_DA_list = Array.from(CO_DBo).fill("")
      const row = CO_DBo[i]
      // for complexity calculation
      const result = vis_table.find(e => e[0] === row[1])
      if (result) complexity += Number(result[3])
      // count no of DA covered with out repetation
      for (var j = 2; j < row?.length; j++) {
        if (row[j]) {
          coverage_DA_count[j] = 1
          // repeated DA coverage gets overwritten
        }
      }

      // for match score calculation
      for (let j = 2; j < row?.length; j++) {
        let DA_count = 0
        if (row[j]) {
          for (var k = 1; k < vis_table_imp?.length; k++) {
            // consider the DA secquance in meta_data and vis_table_imp is same (vis_table_imp is just 1 column ahead)
            if (
              CO_DBo[i][1] == vis_table_imp[k][0] &&
              meta_data[1][j - 1] == vis_table_imp[k][4]
            ) {
              match_DA_list[j - 2] = Number(vis_table_imp[k][7])
            }
          }
        }
      }
      match_DA_list_final.push(match_DA_list)
    }
    console.log("match_DA_list_final", match_DA_list_final)
    // Match Score sum calculation
    let match_VA_imp_sum = 0
    let match_count = 0
    for (var i = 0; i < match_DA_list_final?.length; i++) {
      const row = CO_DBo[i]
      // for complexity calculation
      for (var j = 0; j < len_DA; j++) {
        if (match_DA_list_final[i][j]) {
          match_VA_imp_sum += Number(match_DA_list_final[i][j])
          //console.log("match_DA_list_final",match_DA_list_final[i][j], match_VA_imp_sum, match_count)
          match_count++
        }
      }
    }
    // Match Score Normalization calculation
    let match_score_nomalized = match_VA_imp_sum / (match_count * 100)

    // coverage_imp sum calculation
    // coverage_DA_count_sum = coverage_DA_count?.length?((coverage_DA_count.reduce((p,e)=>p=p+e))):0;
    let coverage_DA_count_sum = meta_data[3].slice(1)?.length
      ? meta_data[3].slice(1).reduce((p, e) => (p = Number(p) + Number(e)))
      : 0

    for (let i = 2; i < coverage_DA_count?.length; i++) {
      if (coverage_DA_count[i]) {
        coverage_imp += Number(meta_data[3][i - 1])
      }
    }
    console.log("coverage_DA_count", coverage_DA_count)
    console.log(
      "coverage_imp,coverage_DA_count_sum",
      coverage_imp,
      coverage_DA_count_sum
    )
    console.log("match_VA_imp_sum,match_count", match_VA_imp_sum, match_count)
    console.log("complexity,CO_DBo?.length", complexity, CO_DBo?.length)

    // Fx = (( match_score_nomalized) + (coverage_imp/(coverage_DA_count_sum))
    //     -(complexity/(CO_DBo?.length*100)))

    // Fx = ((2*match_score_nomalized) + (2*(coverage_imp/(coverage_DA_count_sum))) -
    //        (complexity/(CO_DBo?.length*100)))

    // Fx = ((4*match_score_nomalized) + (4*(coverage_imp/(coverage_DA_count_sum))) -
    //        (1*(complexity/(CO_DBo?.length*100))))

    // Fx = ((match_score_nomalized + (coverage_imp/(coverage_DA_count_sum))) +
    //         (1-(complexity/(CO_DBo?.length*100)))) / 3

    let Fx =
      match_score_nomalized * (coverage_imp / coverage_DA_count_sum) -
      complexity / (CO_DBo?.length * 100)

    // Fx = ((match_score_nomalized) * (coverage_imp/(coverage_DA_count_sum))) *
    //         (1-(complexity/(CO_DBo?.length*100)))

    // Fx = (0.5*(match_score_nomalized)) * (0.3*(coverage_imp/(coverage_DA_count_sum))) *
    //         (0.2*(1-(complexity/(CO_DBo?.length*100))))

    // Fx = (((match_score_nomalized) * (coverage_imp/(coverage_DA_count_sum))) -
    //         (0.1*(complexity/(CO_DBo?.length*100))))

    // push to array for output
    CO_DBo_evaluation.push([
      no,
      Number(match_score_nomalized).toFixed(3),
      Number(coverage_imp / coverage_DA_count_sum).toFixed(3),
      Number(complexity / (CO_DBo?.length * 100)).toFixed(3),
      Fx.toFixed(3)
    ])

    return CO_DBo_evaluation
  }
  //console.log("coverage_DA_count,coverage_imp,coverage_DA_count_sum, match_VA_imp_sum,match_count,complexity,CO_DBo?.length", coverage_DA_count_sum, match_VA_imp_sum, match_count,complexity,CO_DBo?.length)

  //==================== End of CO_DBo fitness Evaluation=========================
  var vis_table
  let getvis_table = async () => {
    let response = await fetch("static_file/vis_table.csv")
    var vis_table_text = await response.text()
    vis_table = vis_table_text.split("\n") // SPLIT ROWS (STRING TO ARRAY)
    for (let i in vis_table) {
      // SPLIT COLUMNS
      vis_table[i] = vis_table[i].split(",")
    }
  }

  var imp_detail_vis_table
  let getimp_detail_vis_table = async () => {
    let response = await fetch("static_file/imp_detail_vis_table.csv")
    var imp_detail_vis_table_text = await response.text()
    imp_detail_vis_table = imp_detail_vis_table_text.split("\n") // SPLIT ROWS (STRING TO ARRAY)
    for (let i in imp_detail_vis_table) {
      imp_detail_vis_table[i] = imp_detail_vis_table[i].split(",")
    }
  }

  var vis_table_imp
  let getvis_table_imp = async () => {
    let response = await fetch("static_file/imp_detail_vis_table.csv")
    var vis_table_imp_text = await response.text()
    vis_table_imp = vis_table_imp_text.split("\n") // SPLIT ROWS (STRING TO ARRAY)
    for (let i in vis_table_imp) {
      // SPLIT COLUMNS
      vis_table_imp[i] = vis_table_imp[i].split(",")
    }
  }
  const { metadata } = React.useContext(StateContext)
  const getEvaluation = async () => {
    await getvis_table()
    await getimp_detail_vis_table()
    await getvis_table_imp()
    let DBo_head = []
    DBo_head.push(["DBo", "vis_name", ...metadata[0].slice(1)])
    let DBo_vis = [...DBo_head]
    let vis=[]
    element.forEach((element2, index2) => {
      vis.push(element2.vis)
    })
    DBo_vis.push(...vis)
    console.log(DBo_vis)
    let eval_res = DBo_evaluation_fxn(
      DBo_vis.slice(1),
      1,
      metadata[0].slice(1)?.length,
      vis_table,
      vis_table_imp,
      metadata
    )
    console.log(eval_res)
    setEvalutationData(eval_res[0])
  }
  const getDivIndex = (index1, index2) => {
    if (index1 === 0) {
      return index2 + 1
    }
    else if (index1 === 1) {
      return (2 * index1 + 1) + index2;
    }
    else if (index1 === 2) {
      return (2 * index1 + 1) + index2;
    }
  }

  useEffect(() => {
    personalisedDBO[index].forEach((element, index2) => {
      setArrayOfSvgs(prevarrayOfSvgs => [...prevarrayOfSvgs, element.svg]);
    })
  }, [personalisedDBO])
  return (
    <div className="bg-white shadow-lg rounded-xl min-w-[13vw] min-h-[21vh] max-w-[13vw] max-h-[23vh]">
      <div
        className=""
        id={`personaliedDBO-${index}`}
        onClick={() => {
          setIsPersonalisedDBO(true)
          setSelectedPersonalisedDBO(personalisedDBO[index])
        }}
      >
        <div className="px-2 py-2 personaliedparent">
          {
            element.map((element2, index2) => {
              return <div key={index} className={`w-max h-max personalisedSVGs personalisedRightdiv-${getDivIndex(index, index2)}`} dangerouslySetInnerHTML={{ __html: element2.svg }}></div>
            })
          }
        </div>
      </div>
      <div className="flex w-full justify-around items-center my-1">
        {!isLocked ? (
          <BsFillLockFill
            className="div3 fill-black h-6 w-6 flex justify-center items-center aspect-square"
            onClick={() => {
              setUnLockedPersonalisedDBo(index)
              setLockedDBOs(prevLockedDBOs =>
                prevLockedDBOs.filter(item => item !== index)
              )
              setIsLocked(true)
            }}
          />
        ) : (
          <BsFillUnlockFill
            className="div3 fill-black h-6 w-6 flex justify-center items-center aspect-square"
            onClick={() => {
              setLockedDBOs(prevLockedDBOs => [...prevLockedDBOs, index])
              setIsLocked(false)
            }}
          />
        )}
        <div
          onClick={e => {
            e.preventDefault()
            getEvaluation()
          }}
        >
          <AiOutlineInfoCircle
            className={`fill-[#241f44] h-6 w-6 aspect-square`}
          />
        </div>
        <AiOutlineDownload
          className="div fill-black h-6 w-6 flex justify-center items-center aspect-square"
          onClick={handleDownload}
        />
        <MdDelete
          className="div2 fill-black h-6 w-6 flex justify-center items-center aspect-square"
          onClick={e => {
            e.preventDefault()
            setPersonalisedDBO(prevPersonalisedDBO =>
              prevPersonalisedDBO.filter((item, i) => i !== index)
            )
            setLockedDBOs(prevLockedDBOs =>
              prevLockedDBOs.filter(item => item !== index)
            )
            setUnLockedPersonalisedDBo(0)
          }}
        />
      </div>
      <p className="font-bold text-[#5A44D5] text-center w-full">
        Perosnalised DBo-{index + 1}
      </p>
    </div>
  )
}

const Modal1 = () => {
  const [selected, setSelected] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box bg-[#9F8EFF] min-w-[45vw]">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={(e) => {
            setIsSubmit(false)
          }}>
            ✕
          </button>
        </form>
        {isSubmit ? (
          <>
            <h1 className="font-bold text-lg text-white">
              Thank you for using our “Simple-Vis”. It seems you had a negative experience.
            </h1>
            {selected.includes(
              "Data attributes of high interest are not in the visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white mb-3">
                    <span className="font-medium underline">Problem 1</span>: Data attributes of high interest are not in the visualizations?
                  </p>
                  <p className="">
                    <span className="font-medium underline">Solution 1</span>:
                    &nbsp;Please try to adjust the attributes importance in the “Data attributes importance”
                    panel. Increase the importance to 100 for those attributes
                  </p>
                </div>
              )}
            {selected.includes(
              "Data attributes of low interest are in the visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium underline">Problem 2</span>: Data attributes of low interest are in the visualizations?
                  </p>
                  <p>
                    Solution 2: Please try to adjust the attributes importance in the “Data attributes importance”
                    panel. Decrease the importance to 25 for those attributes. If you set the
                    importance to 0, the attribute will be ignored and will not appear anymore in the
                    dashboards.
                  </p>
                </div>
              )}
            {selected.includes(
              "The type of a data attribute is not correct?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 3:</span> The type of a data attribute is not correct?
                  </p>
                  <p className="">
                    Solution 3:
                    Please go to the home page, and reload your data. You will have the possibility to change the metadata about data attributes.
                  </p>
                </div>
              )}
            {selected.includes(
              "Visualizations are too complex to understand?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 4:</span> Visualizations are too complex to understand?
                  </p>
                  <p className="">
                    Solution:4
                    Please try to select visualizations that you know better in the “Selected
                    visualizations” panel. Only the selected visualizations will appear in the generated
                    dashboards.
                  </p>
                </div>
              )}
            {selected.includes(
              "There are too many/too few visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 5:</span> There are too many/too few visualizations?
                  </p>
                  <p className="">
                    Solution 5:
                    Please adjust the minimum and maximum number of visualizations you want to
                    see in the dashboards using the “Number of visualizations” panel.
                  </p>
                </div>
              )}
            {selected.includes(
              "I would like to edit or personalize a dashboard?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 6:</span> I would like to edit or personalize a dashboard?
                  </p>
                  <p className="">
                    Solution 6:
                    Please click on the “eye” button. Icons now appear in each visualization.
                    <br />
                    &apos;🗑&apos;: You can remove any visualization from the dashboard.
                    <br />
                    <div className="flex justify-center items-center"><AiFillEdit />: You can change the data attributes present in a visualization</div>
                    &apos;+&apos;: You can add the visualization to a personalized dashboard (see the upper right
                    corner of the interface)
                  </p>
                </div>
              )}
            {selected.includes(
              "Visualizations look very similar?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 7:</span> Visualizations look very similar?
                  </p>
                  <p className="">
                    Solution 7:
                    Please adjust the minimum and maximum number of visualizations you want to
                    see in the dashboards using the “Number of visualizations” panel.
                  </p>
                </div>
              )}
            {selected.includes(
              "Data attributes are present but not in the visualization I want ?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 8:</span> Data attributes are present but not in the visualization I want ?
                  </p>
                  <p className="">
                    Solution 8:
                    Use manual editing by clicking on the &ldquo;eye&rdquo; button (at bottom). Now icons appear in each visualization
                  </p>
                </div>
              )}
          </>
        ) : (
          <>
            <h3 className="font-bold text-lg text-white">
              Thank you for using our “Simple-Vis”. It seems you had a negative experience.
              <br />
              <br />
              If you want to help us improve our tool, please fill in this <span className="underline italic"> form.</span>
              <br />
              <br />
              Now please check if you had any of the following problems and get immediate
              help that we hope to be useful.
              <br />
              Please let us know what issues you are facing:
            </h3>
            <div className="flex flex-col w-full my-6 gap-3">
              <div className="form-control text-white">
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes of high interest are not in the visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes of high interest are not in the visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes of high interest are not in the visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    1) Data attributes of high interest are not in the visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes of high interest are not in the visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes of low interest are in the visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes of low interest are in the visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes of low interest are in the visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    2) Data attributes of low interest are in the visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes of low interest are in the visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "The type of a data attribute is not correct?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "The type of a data attribute is not correct?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "The type of a data attribute is not correct?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    3) The type of a data attribute is not correct?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "The type of a data attribute is not correct?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Visualizations are too complex to understand?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Visualizations are too complex to understand?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Visualizations are too complex to understand?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    4) Visualizations are too complex to understand?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Visualizations are too complex to understand?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "There are too many/too few visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "There are too many/too few visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "There are too many/too few visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    5) There are too many/too few visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "There are too many/too few visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "I would like to edit or personalize a dashboard?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "I would like to edit or personalize a dashboard?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "I would like to edit or personalize a dashboard?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    6) I would like to edit or personalize a dashboard?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "I would like to edit or personalize a dashboard?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Visualizations look very similar?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Visualizations look very similar?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Visualizations look very similar?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    7) Visualizations look very similar?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Visualizations look very similar?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes are present but not in the visualization I want ?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes are present but not in the visualization I want ?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes are present but not in the visualization I want ?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    8) Data attributes are present but not in the visualization I want ?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes are present but not in the visualization I want ?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
            </div>
          </>
        )}
        {
          !isSubmit &&
          <button
            className="btn btn-outline btn-primary"
            onClick={e => {
              setIsSubmit(true)
            }}
          >
            Submit
          </button>
        }
      </div>
    </dialog>
  )
}
const Modal2 = () => {
  const [selected, setSelected] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box bg-[#9F8EFF] min-w-[45vw]">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={(e) => {
            setIsSubmit(false)
          }}>
            ✕
          </button>
        </form>
        {isSubmit ? (
          <>
            <h1 className="font-bold text-lg text-white">
              Thank you for using our “Simple-Vis”. It seems you had some difficulties
            </h1>
            {selected.includes(
              "Data attributes of high interest are not in the visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white mb-3">
                    <span className="font-medium underline">Problem 1</span>: Data attributes of high interest are not in the visualizations?
                  </p>
                  <p className="">
                    <span className="font-medium underline">Solution 1</span>:
                    &nbsp;Please try to adjust the attributes importance in the “Data attributes importance”
                    panel. Increase the importance to 100 for those attributes
                  </p>
                </div>
              )}
            {selected.includes(
              "Data attributes of low interest are in the visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium underline">Problem 2</span>: Data attributes of low interest are in the visualizations?
                  </p>
                  <p>
                    Solution 2: Please try to adjust the attributes importance in the “Data attributes importance”
                    panel. Decrease the importance to 25 for those attributes. If you set the
                    importance to 0, the attribute will be ignored and will not appear anymore in the
                    dashboards.
                  </p>
                </div>
              )}
            {selected.includes(
              "The type of a data attribute is not correct?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 3:</span> The type of a data attribute is not correct?
                  </p>
                  <p className="">
                    Solution 3:
                    Please go to the home page, and reload your data. You will have the possibility to change the metadata about data attributes.
                  </p>
                </div>
              )}
            {selected.includes(
              "Visualizations are too complex to understand?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 4:</span> Visualizations are too complex to understand?
                  </p>
                  <p className="">
                    Solution:4
                    Please try to select visualizations that you know better in the “Selected
                    visualizations” panel. Only the selected visualizations will appear in the generated
                    dashboards.
                  </p>
                </div>
              )}
            {selected.includes(
              "There are too many/too few visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 5:</span> There are too many/too few visualizations?
                  </p>
                  <p className="">
                    Solution 5:
                    Please adjust the minimum and maximum number of visualizations you want to
                    see in the dashboards using the “Number of visualizations” panel.
                  </p>
                </div>
              )}
            {selected.includes(
              "I would like to edit or personalize a dashboard?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 6:</span> I would like to edit or personalize a dashboard?
                  </p>
                  <p className="">
                    Solution 6:
                    Please click on the “eye” button. Icons now appear in each visualization.
                    <br />
                    &apos;🗑&apos;: You can remove any visualization from the dashboard.
                    <br />
                    <div className="flex justify-center items-center"><AiFillEdit />: You can change the data attributes present in a visualization</div>
                    &apos;+&apos;: You can add the visualization to a personalized dashboard (see the upper right
                    corner of the interface)
                  </p>
                </div>
              )}
            {selected.includes(
              "Visualizations look very similar?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 7:</span> Visualizations look very similar?
                  </p>
                  <p className="">
                    Solution 7:
                    Please adjust the minimum and maximum number of visualizations you want to
                    see in the dashboards using the “Number of visualizations” panel.
                  </p>
                </div>
              )}
            {selected.includes(
              "Data attributes are present but not in the visualization I want ?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 8:</span> Data attributes are present but not in the visualization I want ?
                  </p>
                  <p className="">
                    Solution 8:
                    Use manual editing by clicking on the &ldquo;eye&rdquo; button (at bottom). Now icons appear in each visualization
                  </p>
                </div>
              )}
          </>
        ) : (
          <>
            <h3 className="font-bold text-lg text-white">
              Thank you for using our “Simple-Vis”. It seems you had some difficulties
              <br />
              <br />
              If you want to help us improve our tool, please fill in this <span className="underline italic"> form.</span>
              <br />
              <br />
              Please check if you had any of the following problems and get immediate help:
            </h3>
            <div className="flex flex-col w-full my-6 gap-3">
              <div className="form-control text-white">
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes of high interest are not in the visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes of high interest are not in the visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes of high interest are not in the visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    1) Data attributes of high interest are not in the visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes of high interest are not in the visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes of low interest are in the visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes of low interest are in the visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes of low interest are in the visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    2) Data attributes of low interest are in the visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes of low interest are in the visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "The type of a data attribute is not correct?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "The type of a data attribute is not correct?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "The type of a data attribute is not correct?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    3) The type of a data attribute is not correct?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "The type of a data attribute is not correct?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Visualizations are too complex to understand?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Visualizations are too complex to understand?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Visualizations are too complex to understand?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    4) Visualizations are too complex to understand?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Visualizations are too complex to understand?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "There are too many/too few visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "There are too many/too few visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "There are too many/too few visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    5) There are too many/too few visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "There are too many/too few visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "I would like to edit or personalize a dashboard?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "I would like to edit or personalize a dashboard?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "I would like to edit or personalize a dashboard?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    6) I would like to edit or personalize a dashboard?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "I would like to edit or personalize a dashboard?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Visualizations look very similar?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Visualizations look very similar?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Visualizations look very similar?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    7) Visualizations look very similar?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Visualizations look very similar?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes are present but not in the visualization I want ?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes are present but not in the visualization I want ?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes are present but not in the visualization I want ?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    8) Data attributes are present but not in the visualization I want ?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes are present but not in the visualization I want ?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
            </div>
          </>
        )}
        {
          !isSubmit &&
          <button
            className="btn btn-outline btn-primary"
            onClick={e => {
              setIsSubmit(true)
            }}
          >
            Submit
          </button>
        }
      </div>
    </dialog>
  )
}
const Modal3 = () => {
  const [selected, setSelected] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  return (
    <dialog id="my_modal_5" className="modal">
      <div className="modal-box bg-[#9F8EFF] min-w-[45vw]">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={(e) => {
            setIsSubmit(false)
          }}>
            ✕
          </button>
        </form>
        {isSubmit ? (
          <>
            <h1 className="font-bold text-lg text-white">
              Thank you for using our “Simple-Vis” and for encouraging us.
            </h1>
            {selected.includes(
              "Data attributes of high interest are not in the visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white mb-3">
                    <span className="font-medium underline">Problem 1</span>: Data attributes of high interest are not in the visualizations?
                  </p>
                  <p className="">
                    <span className="font-medium underline">Solution 1</span>:
                    &nbsp;Please try to adjust the attributes importance in the “Data attributes importance”
                    panel. Increase the importance to 100 for those attributes
                  </p>
                </div>
              )}
            {selected.includes(
              "Data attributes of low interest are in the visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium underline">Problem 2</span>: Data attributes of low interest are in the visualizations?
                  </p>
                  <p>
                    Solution 2: Please try to adjust the attributes importance in the “Data attributes importance”
                    panel. Decrease the importance to 25 for those attributes. If you set the
                    importance to 0, the attribute will be ignored and will not appear anymore in the
                    dashboards.
                  </p>
                </div>
              )}
            {selected.includes(
              "The type of a data attribute is not correct?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 3:</span> The type of a data attribute is not correct?
                  </p>
                  <p className="">
                    Solution 3:
                    Please go to the home page, and reload your data. You will have the possibility to change the metadata about data attributes.
                  </p>
                </div>
              )}
            {selected.includes(
              "Visualizations are too complex to understand?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 4:</span> Visualizations are too complex to understand?
                  </p>
                  <p className="">
                    Solution:4
                    Please try to select visualizations that you know better in the “Selected
                    visualizations” panel. Only the selected visualizations will appear in the generated
                    dashboards.
                  </p>
                </div>
              )}
            {selected.includes(
              "There are too many/too few visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 5:</span> There are too many/too few visualizations?
                  </p>
                  <p className="">
                    Solution 5:
                    Please adjust the minimum and maximum number of visualizations you want to
                    see in the dashboards using the “Number of visualizations” panel.
                  </p>
                </div>
              )}
            {selected.includes(
              "I would like to edit or personalize a dashboard?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 6:</span> I would like to edit or personalize a dashboard?
                  </p>
                  <p className="">
                    Solution 6:
                    Please click on the “eye” button. Icons now appear in each visualization.
                    <br />
                    &apos;🗑&apos;: You can remove any visualization from the dashboard.
                    <br />
                    <div className="flex justify-center items-center"><AiFillEdit />: You can change the data attributes present in a visualization</div>
                    &apos;+&apos;: You can add the visualization to a personalized dashboard (see the upper right
                    corner of the interface)
                  </p>
                </div>
              )}
            {selected.includes(
              "Visualizations look very similar?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 7:</span> Visualizations look very similar?
                  </p>
                  <p className="">
                    Solution 7:
                    Please adjust the minimum and maximum number of visualizations you want to
                    see in the dashboards using the “Number of visualizations” panel.
                  </p>
                </div>
              )}
            {selected.includes(
              "Data attributes are present but not in the visualization I want ?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 8:</span> Data attributes are present but not in the visualization I want ?
                  </p>
                  <p className="">
                    Solution 8:
                    Use manual editing by clicking on the &ldquo;eye&rdquo; button (at bottom). Now icons appear in each visualization
                  </p>
                </div>
              )}
          </>
        ) : (
          <>
            <h3 className="font-bold text-lg text-white">
              Thank you for using our “Simple-Vis” and for encouraging us.
              <br />
              <br />
              If you want to help us improve our tool, please fill in this <span className="underline italic"> form.</span>
              <br />
              <br />
              Yet 3 stars is not the best evaluation. Please check if you had any of the following
              problems:
            </h3>
            <div className="flex flex-col w-full my-6 gap-3">
              <div className="form-control text-white">
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes of high interest are not in the visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes of high interest are not in the visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes of high interest are not in the visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    1) Data attributes of high interest are not in the visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes of high interest are not in the visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes of low interest are in the visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes of low interest are in the visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes of low interest are in the visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    2) Data attributes of low interest are in the visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes of low interest are in the visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "The type of a data attribute is not correct?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "The type of a data attribute is not correct?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "The type of a data attribute is not correct?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    3) The type of a data attribute is not correct?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "The type of a data attribute is not correct?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Visualizations are too complex to understand?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Visualizations are too complex to understand?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Visualizations are too complex to understand?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    4) Visualizations are too complex to understand?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Visualizations are too complex to understand?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "There are too many/too few visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "There are too many/too few visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "There are too many/too few visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    5) There are too many/too few visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "There are too many/too few visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "I would like to edit or personalize a dashboard?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "I would like to edit or personalize a dashboard?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "I would like to edit or personalize a dashboard?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    6) I would like to edit or personalize a dashboard?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "I would like to edit or personalize a dashboard?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Visualizations look very similar?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Visualizations look very similar?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Visualizations look very similar?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    7) Visualizations look very similar?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Visualizations look very similar?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes are present but not in the visualization I want ?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes are present but not in the visualization I want ?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes are present but not in the visualization I want ?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    8) Data attributes are present but not in the visualization I want ?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes are present but not in the visualization I want ?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
            </div>
          </>
        )}
        {
          !isSubmit &&
          <button
            className="btn btn-outline btn-primary"
            onClick={e => {
              setIsSubmit(true)
            }}
          >
            Submit
          </button>
        }
      </div>
    </dialog>
  )
}
const Modal4 = () => {
  const [selected, setSelected] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  return (
    <dialog id="my_modal_6" className="modal">
      <div className="modal-box bg-[#9F8EFF] min-w-[45vw]">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={(e) => {
            setIsSubmit(false)
          }}>
            ✕
          </button>
        </form>
        {isSubmit ? (
          <>
            <h1 className="font-bold text-lg text-white">
              Thank you for using our “Simple-Vis”! We are glad to see that you have
              appreciated the results.
            </h1>
            {selected.includes(
              "Data attributes of high interest are not in the visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white mb-3">
                    <span className="font-medium underline">Problem 1</span>: Data attributes of high interest are not in the visualizations?
                  </p>
                  <p className="">
                    <span className="font-medium underline">Solution 1</span>:
                    &nbsp;Please try to adjust the attributes importance in the “Data attributes importance”
                    panel. Increase the importance to 100 for those attributes
                  </p>
                </div>
              )}
            {selected.includes(
              "Data attributes of low interest are in the visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium underline">Problem 2</span>: Data attributes of low interest are in the visualizations?
                  </p>
                  <p>
                    Solution 2: Please try to adjust the attributes importance in the “Data attributes importance”
                    panel. Decrease the importance to 25 for those attributes. If you set the
                    importance to 0, the attribute will be ignored and will not appear anymore in the
                    dashboards.
                  </p>
                </div>
              )}
            {selected.includes(
              "The type of a data attribute is not correct?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 3:</span> The type of a data attribute is not correct?
                  </p>
                  <p className="">
                    Solution 3:
                    Please go to the home page, and reload your data. You will have the possibility to change the metadata about data attributes.
                  </p>
                </div>
              )}
            {selected.includes(
              "Visualizations are too complex to understand?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 4:</span> Visualizations are too complex to understand?
                  </p>
                  <p className="">
                    Solution:4
                    Please try to select visualizations that you know better in the “Selected
                    visualizations” panel. Only the selected visualizations will appear in the generated
                    dashboards.
                  </p>
                </div>
              )}
            {selected.includes(
              "There are too many/too few visualizations?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 5:</span> There are too many/too few visualizations?
                  </p>
                  <p className="">
                    Solution 5:
                    Please adjust the minimum and maximum number of visualizations you want to
                    see in the dashboards using the “Number of visualizations” panel.
                  </p>
                </div>
              )}
            {selected.includes(
              "I would like to edit or personalize a dashboard?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 6:</span> I would like to edit or personalize a dashboard?
                  </p>
                  <p className="">
                    Solution 6:
                    Please click on the “eye” button. Icons now appear in each visualization.
                    <br />
                    &apos;🗑&apos;: You can remove any visualization from the dashboard.
                    <br />
                    <div className="flex justify-center items-center"><AiFillEdit />: You can change the data attributes present in a visualization</div>
                    &apos;+&apos;: You can add the visualization to a personalized dashboard (see the upper right
                    corner of the interface)
                  </p>
                </div>
              )}
            {selected.includes(
              "Visualizations look very similar?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 7:</span> Visualizations look very similar?
                  </p>
                  <p className="">
                    Solution 7:
                    Please adjust the minimum and maximum number of visualizations you want to
                    see in the dashboards using the “Number of visualizations” panel.
                  </p>
                </div>
              )}
            {selected.includes(
              "Data attributes are present but not in the visualization I want ?"
            ) && (
                <div className="my-6">
                  <p className="font-bold text-white">
                    <span className="font-medium">Problem 8:</span> Data attributes are present but not in the visualization I want ?
                  </p>
                  <p className="">
                    Solution 8:
                    Use manual editing by clicking on the &ldquo;eye&rdquo; button (at bottom). Now icons appear in each visualization
                  </p>
                </div>
              )}
          </>
        ) : (
          <>
            <h3 className="font-bold text-lg text-white">
              Thank you for using our “Simple-Vis”! We are glad to see that you have
              appreciated the results.
              <br />
              <br />
              If you want to help us improve our tool, please fill in this <span className="underline italic"> form.</span>
              <br />
              <br />
              Yet you have not selected 5 stars. Please consider using all the features, like the
              personalization of dashboard. Also, please check if you had any of the following
              problems:
            </h3>
            <div className="flex flex-col w-full my-6 gap-3">
              <div className="form-control text-white">
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes of high interest are not in the visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes of high interest are not in the visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes of high interest are not in the visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    1) Data attributes of high interest are not in the visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes of high interest are not in the visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes of low interest are in the visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes of low interest are in the visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes of low interest are in the visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    2) Data attributes of low interest are in the visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes of low interest are in the visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "The type of a data attribute is not correct?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "The type of a data attribute is not correct?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "The type of a data attribute is not correct?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    3) The type of a data attribute is not correct?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "The type of a data attribute is not correct?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Visualizations are too complex to understand?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Visualizations are too complex to understand?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Visualizations are too complex to understand?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    4) Visualizations are too complex to understand?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Visualizations are too complex to understand?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "There are too many/too few visualizations?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "There are too many/too few visualizations?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "There are too many/too few visualizations?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    5) There are too many/too few visualizations?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "There are too many/too few visualizations?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "I would like to edit or personalize a dashboard?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "I would like to edit or personalize a dashboard?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "I would like to edit or personalize a dashboard?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    6) I would like to edit or personalize a dashboard?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "I would like to edit or personalize a dashboard?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Visualizations look very similar?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Visualizations look very similar?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Visualizations look very similar?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    7) Visualizations look very similar?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Visualizations look very similar?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <label
                  className="label cursor-pointer"
                  onClick={e => {
                    if (
                      selected.includes(
                        "Data attributes are present but not in the visualization I want ?"
                      )
                    ) {
                      setSelected(prevSelected =>
                        prevSelected.filter(
                          item =>
                            item !==
                            "Data attributes are present but not in the visualization I want ?"
                        )
                      )
                    } else {
                      setSelected(prevSelected => [
                        ...prevSelected,
                        "Data attributes are present but not in the visualization I want ?"
                      ])
                    }
                  }}
                >
                  <span className="label-text text-white">
                    8) Data attributes are present but not in the visualization I want ?
                  </span>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selected.includes(
                      "Data attributes are present but not in the visualization I want ?"
                    )}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
            </div>
          </>
        )}
        {
          !isSubmit &&
          <button
            className="btn btn-outline btn-primary"
            onClick={e => {
              setIsSubmit(true)
            }}
          >
            Submit
          </button>
        }
      </div>
    </dialog>
  )
}
const Modal5 = () => {
  return (
    <dialog id="my_modal_7" className="modal">
      <div className="modal-box w-max bg-[#9F8EFF]">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg text-white">
          Thank you so much for using our “Simple-Vis”! We are glad to see that you have appreciated the results.
          <br />
          <br />
          If you want to help us improve our tool, please fill in this <span className="italic underline">form</span>
          <br />
          <br />
          Also, consider using the Personalized dashboard functionality (upper right corner of the interface). Help can be found <span className="italic underline"> here </span>
        </h3>
      </div>
    </dialog>
  )
}

const Modal6 = ({ data }) => {
  return (
    <dialog id="my_modal_8" className="modal">
      <div className="modal-box bg-[#9F8EFF] min-w-[45vw]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-white">DBo Properties</h3>
        {/* <p className="py-4">Press ESC key or click outside to close</p> */}
        <div className="overflow-x-auto">
          <table className="table table-xs text-white">
            <thead>
              <tr>
                <th className="text-white">Match Score</th>
                <th className="text-white">Coverage Importance</th>
                <th className="text-white">Complexity</th>
                <th className="text-white">Fitness</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
                <td>{data[3]}</td>
                <td>{data[4]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}


export default Right
