"use client"

import React, { useEffect } from "react"
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs"
import { MdDelete, MdOutlineChangeCircle } from "react-icons/md"
import { BiData, BiDownload, BiExpand, BiZoomIn } from "react-icons/bi"
import {
  AiOutlineDown,
  AiOutlineInfoCircle,
  AiOutlineDownload
} from "react-icons/ai"
import { TbNotes } from "react-icons/tb"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./center.css"
import layout from "../../../assets/layout.png"
import complex from "../../../assets/complex.png"
import Image from "next/image"
import { StateContext } from "../../../StateProvider"
const Screen = ({
  db,
  setClicked,
  clicked,
  complexity,
  personalisedDBO,
  setPersonalisedDBO,
  isperosnalisedDBO,
  selectedPersonalisedDBO,
  unLockedPersonalisedDBo,
  setUnLockedPersonalisedDBo,
  lockedDBOs,
  setLockedDBOs,
  userType,
  setUserType,
  complexityType,
  setComplexityType,
  layoutType,
  setLayoutType,
  isLeftExpanded,
  setIsLeftExpanded,
  isRightExpanded,
  setIsRightExpanded,
}) => {
  const [visualization, setVisualization] = React.useState([])
  const [zoomedIndex, setZoomedIndex] = React.useState(null)
  const [fullSVG, setFullSVG] = React.useState(null)
  const zoomedSvgRef = React.useRef(null)
  const [isIconsShownFull, setIsIconsShownFull] = React.useState(false)
  const {
    DBo_POP,
    dbo_evaluation,
    setDBo_POP,
    setdbo_evaluation,
    best_DBos,
    metadata,
    final_DBo_all,
    final_eval_all,
    setFinal_eval_all,
    setFinal_DBo_all,
    range,
    selectedVis,
    setFinal_DBO,
    setBest_DBos, fileData,
    best_DBos_SVGs,
  } = React.useContext(StateContext)
  const [info, setInfo] = React.useState([])
  let data2 = []

  const runGeneticAlgorithm = async (DBo_POP, dbo_evaluation) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/algorithm/geneticAlgo`, {
      method: "POST",
      body: JSON.stringify({
        DBo_POP: DBo_POP,
        DBo_POP_EVAL: dbo_evaluation,
        metadata: metadata,
        selectedVis: selectedVis
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status == 200) {
      console.log(data);
      let tempfinalDataDBO = data.last_DBo;
      setFinal_DBO(tempfinalDataDBO);
      let updatedDBO = data.final_DBo_all;
      updatedDBO = updatedDBO.map((item) => item.split(","));
      console.log(updatedDBO);
      setFinal_DBo_all(updatedDBO);
      console.log(final_DBo_all);
      let tempfinalDataEval = data.final_DBo_eval;
      tempfinalDataEval = tempfinalDataEval.map((item) => item.split(","));
      setFinal_eval_all(tempfinalDataEval);
      console.log(final_eval_all);

      setTimeout(() => {
        Sort(final_DBo_all, final_eval_all, setBest_DBos, fileData);
      }, 1000);
    }
  };

  const runRandomAlgorithm = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/algorithm/randomGen`, {
      method: "POST",
      body: JSON.stringify({
        min: range.min,
        max: range.max,
        selectedVis: selectedVis,
        metadata: metadata
      }
      ),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data.data);
    if (data.status == "success") {
      setDBo_POP(data.data.Dbo);
      setdbo_evaluation(data.data.DBo_eval);
      runGeneticAlgorithm(data.data.Dbo, data.data.DBo_eval);
    }
  };

  const getvisualization = async (db) => {
    const rows = best_DBos[db].DBo
    setInfo(prev => {
      return best_DBos[db].evalution
    })
    setDa_NumberData({
      total: 0,
      mandatory: 0,
      important: 0,
      LessImportant: 0,
      Average: 0,
      excluded: 0
    })
    isperosnalisedDBO
      ? setVisualization(selectedPersonalisedDBO)
      : setVisualization(best_DBos_SVGs[db].visualizationArray)
    setFullSVG(best_DBos_SVGs[db].fullSVG)
  }

  const [Da_NumberData, setDa_NumberData] = React.useState({
    total: 0,
    mandatory: 0,
    important: 0,
    LessImportant: 0,
    Average: 0,
    excluded: 0
  })

  const getData3 = () => {
    if (metadata && metadata[0]?.length > 0 && data2 && data2?.length > 0)
      for (let i = 0; i < metadata[0]?.length; i++) {
        if (data2.includes(metadata[0][i])) {
          if (metadata[3][i] == 100) {
            setDa_NumberData(prev => ({
              ...prev,
              mandatory: prev.mandatory + 1,
              total: prev.total + 1
            }))
          }
          else if (metadata[3][i] > 50 && metadata[3][i] < 100) {
            setDa_NumberData(prev => {
              return {
                ...prev,
                important: prev.important + 1,
                total: prev.total + 1
              }
            })
          } else if (metadata[3][i] == 50) {
            setDa_NumberData(prev => {
              return { ...prev, Average: prev.Average + 1, total: prev.total + 1 }
            })
          } else if (metadata[3][i] > 0 && metadata[3][i] < 50) {
            setDa_NumberData(prev => {
              return {
                ...prev,
                LessImportant: prev.LessImportant + 1,
                total: prev.total + 1
              }
            })
          } else if (metadata[3][i] == 0) {
            setDa_NumberData(prev => {
              return {
                ...prev,
                excluded: prev.excluded + 1,
                total: prev.total + 1
              }
            })
          }
        }
      }
  }

  const getData2 = (db) => {
    visualization.forEach((element, index2) => {
      console.log(element)
      if (element.content.length > 0) {
        element.content.forEach(element2 => {
          if (data2.indexOf(element2) == -1) {
            data2.push(element2)
          }
        })
      }
    })
    console.log(data2)
  }
  
  React.useEffect(() => {
    setVisualization([])
    if (best_DBos_SVGs && best_DBos_SVGs?.length > 0) {
      setTimeout(() => {
        getvisualization(db)
      }, 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, isperosnalisedDBO, best_DBos_SVGs])

  React.useEffect(() => {
    const handleClickOutside = event => {
      if (zoomedIndex !== null) {
        const zoomedContainer = document.querySelector(".main-component")
        if (
          zoomedContainer &&
          !zoomedContainer.contains(event.target) &&
          !event.target.classList.contains("icon")
        ) {
          setZoomedIndex(null)
        }
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [zoomedIndex])

  useEffect(() => {
    if (visualization && visualization.length > 0) {
      setTimeout(() => {
        getData2()
        getData3()
      }, 1000)
    }
  }, [visualization]);

  const layoutTypes = ["V-Concat", "H-Concat"]
  const complexityTypes = ["Low-High", "High-Low"]

  const [isBottomVisible, setIsBottomVisible] = React.useState(true)

  const [DBO_Ratings, setDBO_Ratings] = React.useState([
    {
      DBO: 0,
      Ratings: 0
    }
  ])

  const DownloadDBO_POP = () => {
    const blob = new Blob([DBo_POP], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "DBo_POP.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }
  const DownloadDBO_EVAL = () => {
    const blob = new Blob([dbo_evaluation], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "DBo_POP_EVAL.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }
  const DownloadFinal_DBO = () => {
    // console.log(final_DBo_all)
    let tempFinalDboAll = final_DBo_all
    for (let i in tempFinalDboAll) {
      // join COLUMNS
      tempFinalDboAll[i] = tempFinalDboAll[i].join(",");
    }
    tempFinalDboAll = tempFinalDboAll.join("\n");
    const blob = new Blob([tempFinalDboAll], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "FINAL_DBo_FOR_VL.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }
  const DownloadFinal_EVAL = () => {
    let tempFinalEvalALL = final_eval_all
    for (let i in tempFinalEvalALL) {
      // join COLUMNS
      tempFinalEvalALL[i] = tempFinalEvalALL[i].join(",");
    }
    tempFinalEvalALL = tempFinalEvalALL.join("\n");
    const blob = new Blob([tempFinalEvalALL], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "FINAL_DBo_EVAL.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }
  const Sort = (final_DBo_all,
    final_eval_all,
    setBest_DBos,
    fileData) => {
    // console.log(final_eval_all)
    let sorted_fitness = []

    sorted_fitness = final_eval_all.sort((a, b) => Number(a[4]) - Number(b[4]))
    //   console.log("sorted_fitness ", sorted_fitness);
    // 2. Find worst worst candidate (DBo) from in DBo_Eval file
    let worst_candidate = sorted_fitness[1]
    // let result_worst = final_eval_all.find(
    //   (e: any) => e[4] === worst_candidate
    // );
    // let DBo_id_worst = result_worst[1];
    //   console.log("worst_candidate ", worst_candidate);

    let best_candidates = [
      sorted_fitness[sorted_fitness?.length - 1],
      sorted_fitness[sorted_fitness?.length - 2],
      sorted_fitness[sorted_fitness?.length - 3],
      sorted_fitness[sorted_fitness?.length - 4],
      sorted_fitness[sorted_fitness?.length - 5]
    ]
    //   console.log("Best candidates are",best_candidates);
    let otherDBOs = []
    best_candidates.forEach(element => {
      let temp = ["DBo", "vis_name"]
      fileData[0].forEach(e => {
        temp.push(e)
      })
      let arr = [temp]
      final_DBo_all.find(e => {
        if (e[0] === element[0]) {
          arr.push(e)
        }
      })
      let obj = {
        evalution: element,
        DBo: arr
      }
      otherDBOs.push(obj)
    })
    //   console.log("Top DBo Are",otherDBOs))
    // console.log(otherDBOs[0].DBo);
    setBest_DBos(otherDBOs)
  }
  return (
    <div
      className={`flex flex-col relative h-screen ${!isLeftExpanded && !isRightExpanded
        ? "w-screen -translate-x-[21.7rem]"
        : ""
        } bg-primary`}
    >
      <ToastContainer />
      <InputModal db={db} />
      {Array.isArray(info) && info?.length > 0 && <Modal1 data={info} data2={Da_NumberData} />}
      {!isBottomVisible && (
        <button
          className="btn fixed z-10 bottom-5 right-5 bg-[#9F8EFF] border-none hover:bg-secondary text-secondary text-white"
          onClick={e => {
            setIsRightExpanded(prev => !prev)
            setIsLeftExpanded(prev => !prev)
            setIsBottomVisible(prev => !prev)
            document.querySelector(".leftSection").style.opacity = "100"
          }}
        >
          Exit Full Screen
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <h1 className=" text-2xl font-bold text-center text-[#8c79f9] w-full flex justify-center items-center gap-2">
        {isperosnalisedDBO && "Personal"} Dashboard - {db + 1}
        <div
          onClick={() => {
            const modal = document.getElementById("my_modal_10")
            if (modal) {
              modal.showModal()
            }
          }}
        >
          <AiOutlineInfoCircle className="self-center cursor-pointer" />
        </div>
        <div onClick={e => {
          e.preventDefault()
          DownloadDBO_POP()
          DownloadDBO_EVAL()
          DownloadFinal_DBO()
          DownloadFinal_EVAL()
        }}>
          <BiDownload className="self-center cursor-pointer" />
        </div>
      </h1>
      <div
        className={`flex flex-wrap justify-center items-center gap-2 bg-primary rounded-[50%] p-5 relative`}
      >
        {
          visualization.map((svg, index) => (
            <div
              key={index}
              className={`flex flex-col justify-start items-center ${zoomedIndex === index ? "zoomed-svg" : ""
                } bg-white rounded-xl shadow-xl p-3 flex-item`}
            >
              <EachDBOComponent
                {...{
                  svg: svg.svg,
                  index,
                  zoomedIndex,
                  setZoomedIndex,
                  setVisualization,
                  zoomedSvgRef,
                  content: svg.content,
                  setClicked,
                  clicked,
                  isIconsShownFull,
                  personalisedDBO,
                  setPersonalisedDBO,
                  element: svg.element,
                  vis: svg.vis,
                  unLockedPersonalisedDBo,
                  setUnLockedPersonalisedDBo,
                  lockedDBOs,
                  setLockedDBOs,
                  isLeftExpanded,
                  isRightExpanded,
                  obj: svg
                }}
              />
            </div>
          ))}
      </div>
      {isBottomVisible && (
        <div className="bottomNav flex justify-center items-start text-black absolute gap-1 bottom-5 w-full h-max min-h-max rounded-t-xl">
          <div
            className="filter1 w-20 h-20 flex justify-center items-center flex-col border-r-2 px-3 text-white border-white bg-[#9F8EFF] rounded-[50%] shadow-lg tooltip"
            data-tip="Layout"
          >
            <div className="w-10 h-12 flex justify-center items-center">
              <Image
                src={layout}
                className="w-14"
                alt="user"
                width={200}
                height={200}
                onClick={e => {
                  e.preventDefault()
                  const currentIndex = layoutTypes.indexOf(layoutType)
                  const nextIndex = (currentIndex + 1) % layoutTypes?.length
                  setLayoutType(layoutTypes[nextIndex])
                }}
              />
            </div>
          </div>
          <div
            className="filter2 w-20 h-20 flex justify-center items-center flex-col border-r-2 px-3 text-white border-white bg-[#9F8EFF] rounded-[50%] shadow-lg tooltip"
            data-tip="Complexity"
          >
            <div className="w-10 h-12 flex justify-center items-center">
              <Image
                src={complex}
                className="w-14"
                alt="user"
                width={200}
                height={200}
                onClick={e => {
                  e.preventDefault()
                  const currentIndex = complexityTypes.indexOf(complexityType)
                  const nextIndex = (currentIndex + 1) % complexityTypes?.length
                  setComplexityType(complexityTypes[nextIndex])
                }}
              />
            </div>
          </div>
          <div
            className="visibility w-20 h-20 text-center flex flex-col justify-center items-center px-3 text-white bg-[#9F8EFF] rounded-[50%] shadow-lg tooltip"
            data-tip="Show Icons"
          >
            <div className="w-10 h-12 flex justify-center items-center">
              <Image
                src={
                  isIconsShownFull
                    ? require("../../../assets/eye.png")
                    : require("../../../assets/eye_closed.png")
                }
                className="w-14"
                alt=""
                onClick={e => {
                  e.preventDefault()
                  setIsIconsShownFull(prev => {
                    return !prev
                  })
                }}
              />
            </div>
          </div>
          <div
            className="GA w-20 h-20 flex flex-col text-center justify-center items-center px-3 border-r-2 border-white bg-[#9F8EFF] rounded-[50%] shadow-xl tooltip pulsate-fwd"
            onClick={e => {
              e.preventDefault()
              setDBo_POP([])
              setdbo_evaluation([])
              setTimeout(() => {
                runRandomAlgorithm()
              }, 1000)
            }}
            data-tip="Re-run GA"
          >
            <div className="w-10 h-12 flex justify-center items-center">
              <Image
                src={require("../../../assets/db.png")}
                className="w-14"
                alt=""
              />
            </div>
          </div>
          <div
            className="expand w-20 h-20 text-center flex flex-col justify-center items-center px-3 text-white bg-[#9F8EFF] rounded-[50%] shadow-lg tooltip"
            data-tip="Full Screen"
          >
            <div
              className="w-10 h-12 flex justify-center items-center"
              onClick={e => {
                e.preventDefault()
                setIsRightExpanded(prev => !prev)
                setIsLeftExpanded(prev => !prev)
                setIsBottomVisible(prev => !prev)
                // console.log(document.querySelector(".leftSection"))
                document.querySelector(".leftSection").style.opacity = "0"
                // console.log(document.querySelector(".leftSection"))
              }}
            >
              <BiExpand className="w-10 h-12" />
            </div>
          </div>
          <div
            className="download w-20 h-20 text-center flex flex-col justify-center items-center px-3 border-r-2 text-white border-white bg-[#9F8EFF] rounded-[50%] shadow-lg tooltip"
            data-tip="Download DBo"
          >
            <div className="w-10 h-12 flex justify-center items-center">
              <Image
                src={require("../../../assets/download.png")}
                className="w-14"
                alt=""
                onClick={e => {
                  e.preventDefault()
                  const element = document.createElement("a")
                  const file = new Blob([fullSVG], { type: "image/svg+xml" })
                  element.href = URL.createObjectURL(file)
                  element.download = "visualization.svg"
                  document.body.appendChild(element) // Required for this to work in FireFox
                  element.click()
                }}
              />
            </div>
          </div>
          <div
            className="expand w-20 h-20 text-center flex flex-col justify-center items-cente px-3 text-white bg-[#9F8EFF] rounded-[50%] shadow-lg tooltip"
            data-tip="Take Notes"
          >
            <div
              className="w-full flex justify-center items-center"
              onClick={e => {
                const modal_2 = document.getElementById("modal_2")
                if (modal_2) {
                  modal_2.showModal()
                }
              }}
            >
              <TbNotes className="w-10 h-12" />
            </div>
          </div>
          <div className="ratings w-max">
            <div className="p-2 h-20 rounded-lg bg-[#9F8EFF]">
              <DB_Rating
                dbo={1}
                DBO_Ratings={DBO_Ratings}
                setDBO_Ratings={setDBO_Ratings}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const EachDBOComponent = ({
  svg,
  index,
  zoomedIndex,
  setZoomedIndex,
  setVisualization,
  zoomedSvgRef,
  content,
  setClicked,
  isIconsShownFull,
  personalisedDBO,
  setPersonalisedDBO,
  element,
  unLockedPersonalisedDBo,
  setUnLockedPersonalisedDBo,
  lockedDBOs,
  setLockedDBOs,
  isLeftExpanded,
  isRightExpanded,
  vis,
  obj
}) => {
  const [isSaved, setIsSaved] = React.useState()
  const [isIconsShown, setIsIconsShown] = React.useState(false)

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
    downloadSVG(svg, `visualization_${index + 1}.svg`)
  }

  const addPersonalisedDBO = (svg, element, vis, unLockedPersonalisedDBo) => {
    if (Array.isArray(personalisedDBO) && personalisedDBO?.length === 0) {
      setPersonalisedDBO([[obj]])
      setUnLockedPersonalisedDBo(0)
    }
    else {
      if (
        lockedDBOs.includes(unLockedPersonalisedDBo) &&
        lockedDBOs?.length !== 1 &&
        unLockedPersonalisedDBo !== lockedDBOs?.length - 1
      ) {
        if (personalisedDBO?.length != 5) {
          setPersonalisedDBO(prevArrays => [
            ...prevArrays,
            [obj]
          ])
          setUnLockedPersonalisedDBo(prev => prev + 1)
        }
        else {
          alert("Maximum number of personalised DBo Reached")
        }
      } else {
        const unLockedDBo = personalisedDBO[unLockedPersonalisedDBo]
        if (unLockedDBo?.length < 9) {
          setPersonalisedDBO(prevArrays => {
            const newArrays = [...prevArrays]
            const unlockedElement = newArrays[unLockedPersonalisedDBo]
            unlockedElement.push(obj)
            newArrays[unLockedPersonalisedDBo] = unlockedElement
            return newArrays
          })
        } else {
          if (!personalisedDBO?.length == 5) {
            setPersonalisedDBO(prevArrays => [
              ...prevArrays,
              [obj]
            ])
            setUnLockedPersonalisedDBo(prev => prev + 1)
          }
          else {
            window.alert("Maximum number of personalised DBo Reached in second else")
          }
        }
      }
    }
  }

  const removePersonalisedDBO = (element, setLockedDBOs) => {
    let idx = -1;
    console.log(element);
    setPersonalisedDBO(prevArrays => {
      const arr = prevArrays.filter(subArray => {
        const filteredArray = subArray.filter(item => item.element !== element);
        console.log(filteredArray)
        return filteredArray.length > 0;
      });
      return arr;
    });

    if (idx !== -1) {
      setLockedDBOs(prev => prev.filter(item => item !== idx));
      setUnLockedPersonalisedDBo(prev => (prev - 1 > 0 ? prev - 1 : 0));
    }
  };

  useEffect(() => {
    const isObjPresent = personalisedDBO.some((item) => {
      return item.some((subItem) => subItem.svg === svg);
    });
    setIsSaved(isObjPresent);
  }, [personalisedDBO]);
  return (
    <div
      className={`each-dbo-component ${zoomedIndex === index ? "zoomed" : ""}`}
      onClick={event => {
        if (
          zoomedIndex === index &&
          event.target.classList.contains("zoomed-container")
        ) {
          // Clicking inside the zoomed container, don't zoom out
          return
        }
        // Handle your existing click logic here
      }}
    >
      {
        zoomedIndex === index && (
          <div className="fixed top-0 right-0 m-4">
            <button className="p-2 rounded-full bg-white text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )
      }
      <div
        className="main-component"
        onMouseEnter={() => {
          setIsIconsShown(true)
        }}
        onMouseLeave={e => {
          setIsIconsShown(false)
        }}
      >
        <div className={`${zoomedIndex === index ? "parent2" : "parent"}`}>

          <div
            dangerouslySetInnerHTML={{ __html: svg }}
            className={`div1 w-max h-max relative main-svg ${!isLeftExpanded && !isRightExpanded ? "expanded_svg" : ""
              } ${zoomedIndex === index ? "zoomed rounded-xl div1-2" : ""}`}
            ref={zoomedIndex === index ? zoomedSvgRef : null}
            onClick={() => {
              setClicked(prevClicked => {
                return []
              })
              setTimeout(() => {
                setClicked(content)
              }, 100)
              // setClicked(content);
            }}
          />
          <div
            className={`${zoomedIndex === index ? "div5-2" : "div5"
              } flex justify-center items-center ${isIconsShown || isIconsShownFull ? "fill-[#241f44]" : "fill-white"
              } transition-all`}
            onClick={e => {
              e.preventDefault()
              toast.info(`Visualization ${index + 1}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined
              })
            }}
          >
            <AiOutlineInfoCircle
              className={`fill-[#241f44] h-6 w-6 aspect-square ${isIconsShown || isIconsShownFull
                ? "fill-[#241f44]"
                : "fill-white"
                } `}
            />
          </div>

          <MdDelete
            className={`${zoomedIndex === index ? "div3-2" : "div6"
              } h-6 w-6 flex justify-center items-center aspect-square self-center justify-self-center ${isIconsShown || isIconsShownFull ? "fill-[#241f44]" : "fill-white"
              } transition-all`}
            onClick={e => {
              e.preventDefault()
              setVisualization(prevvisualization =>
                prevvisualization.filter((item, i) => i !== index)
              )
            }}
          />

          {isSaved ? (
            <BsPlusCircleFill
              className={` h-6 w-6 ${zoomedIndex === index ? "div4-2" : "div2"
                } flex justify-center items-center aspect-square justify-self-center self-center ${isIconsShown || isIconsShownFull
                  ? "fill-[#241f44]"
                  : "fill-white"
                } transition-all`}
              onClick={e => {
                e.preventDefault()
                console.log("Remove Called");
                removePersonalisedDBO(element, setLockedDBOs)
              }}
            />
          ) : (
            <BsPlusCircle
              className={` h-6 w-6 ${zoomedIndex === index ? "div4-2" : "div2"
                } flex justify-center items-center aspect-square justify-self-center self-center ${isIconsShown || isIconsShownFull
                  ? "fill-[#241f44]"
                  : "fill-white"
                } transition-all`}
              onClick={e => {
                e.preventDefault()
                addPersonalisedDBO(svg, element, vis, unLockedPersonalisedDBo)
              }}
            />
          )}

          <AiOutlineDownload
            className={`${zoomedIndex === index ? "div6-2" : "div3"
              } fill-[#241f44] justify-self-center self-center h-6 w-6 flex justify-center items-center aspect-square ${isIconsShown || isIconsShownFull ? "fill-[#241f44]" : "fill-white"
              } transition-all`}
            onClick={handleDownload}
          />
          <BiZoomIn
            className={`h-6 w-6 flex justify-center items-center aspect-square div4 fill-[#241f44] justify-self-center self-center ${isIconsShown || isIconsShownFull ? "fill-[#241f44]" : "fill-white"
              } ${zoomedIndex === index ? "hidden" : ""} transition-all `}
            onClick={() => {
              if (zoomedIndex === index) {
                setZoomedIndex(null)
              } else {
                setIsIconsShown(!isIconsShown)
                setZoomedIndex(index)
                // Scroll the zoomed SVG element into view
                if (zoomedSvgRef.current) {
                  zoomedSvgRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                  })
                }
              }
            }}
          />

          <div
            className={`flex div7-2 flex-col justify-center items-center ${!isIconsShown &&
              "fill-white"} ${zoomedIndex === index ? "" : "hidden"
              } transition-all `}
          >
            <MdOutlineChangeCircle
              className={`fill-[#241f44] h-6 w-6 aspect-square self-center justify-self-center ${!isIconsShown &&
                "fill-white"} transition-all`}
            />
            <AiOutlineDown
              className={`fill-[#241f44] h-6 w-6 aspect-square self-center justify-self-center ${!isIconsShown &&
                "fill-white"} transition-all `}
            />
          </div>
          <div
            className={`flex flex-col div2-2 justify-center items-center ${!isIconsShown &&
              "fill-white"} ${zoomedIndex === index ? "" : "hidden"
              } transition-all`}
          >
            <BiData
              className={`fill-[#241f44] h-6 w-6 aspect-square self-center justify-self-center ${!isIconsShown &&
                "fill-white"} transition-all`}
            />
            <AiOutlineDown
              className={`fill-[#241f44] h-6 w-6 aspect-square self-center justify-self-center ${!isIconsShown &&
                "fill-white"} transition-all`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const InputModal = ({ db }) => {
  return (
    <dialog id="modal_2" className="modal">
      <div className="modal-box bg-[#9F8EFF]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-5">
          Your Notes for Dashboard-{db + 1} !
        </h3>
        <div className="grow-wrap">
          <textarea
            placeholder="Type here"
            id="text"
            name="text"
            className="input bg-primary outline-none w-full break-normal resize-y h-max text-secondary"
            onInput={e => {
              const textArea = document.getElementById("text")
              if (textArea) {
                textArea.style.height = "auto"
                textArea.style.height = textArea.scrollHeight + "px"
              }
            }}
          />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

const Modal1 = ({ data, data2 }) => {
  return (
    <dialog id="my_modal_10" className="modal">
      <div className="modal-box bg-[#9F8EFF] w-max max-w-none">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-white">DBo Fitness Evalution</h3>
        {/* <p className="py-4">Press ESC key or click outside to close</p> */}
        <div className="">
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

        <h3 className="font-bold my-4 text-lg text-white">DA insights and Analytics</h3>

        <div className="w-max">
          <table className="table table-xs text-white w-max">
            <thead>
              <tr>
                <th className="text-white">DA Importance type</th>
                <th className="text-white">Total Number of DA</th>
                <th className="text-white">Mandatory</th>
                <th className="text-white">Important</th>
                <th className="text-white">Average</th>
                <th className="text-white">Less Important</th>
                <th className="text-white">Excluded</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Number of DA Covered</td>
                <td>{data2.total}</td>
                <td>{data2.mandatory}</td>
                <td>{data2.important}</td>
                <td>{data2.Average}</td>
                <td>{data2.LessImportant}</td>
                <td>{data2.excluded}</td>
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

const DB_Rating = ({ dbo, DBO_Ratings, setDBO_Ratings }) => {
  useEffect(() => {
    const stars = document.querySelectorAll(".star")
    const emojiEl = document.querySelector(".emoji")
    const statusEl = document.querySelector(".status")
    let currentRatingIndex = 0

    const ratings = [
      { emoji: "✨", name: "Rating" },
      { emoji: "😔", name: "Very Bad" },
      { emoji: "🙁", name: "Bad" },
      { emoji: "🙂", name: "Good" },
      { emoji: "🤩", name: "Very Good" },
      { emoji: "🥰", name: "Excellent" }
    ]

    const checkSelectedStar = star => {
      if (parseInt(star.getAttribute("data-rate")) === currentRatingIndex) {
        return true
      } else {
        return false
      }
    }

    const setRating = index => {
      stars.forEach(star => star.classList.remove("selected"))
      if (index > 0 && index <= stars?.length) {
        const selectedStar = document.querySelector(`[data-rate="${index}"]`)
        if (selectedStar) {
          selectedStar.classList.add("selected")
        }
      }
      if (emojiEl) {
        emojiEl.innerHTML = ratings[index].emoji
      }
      if (statusEl) {
        statusEl.innerHTML = ratings[index].name
      }
    }

    const resetRating = () => {
      const existingRatingForDBO = DBO_Ratings.findIndex(
        dbo_rating => dbo_rating.DBO === dbo
      )

      if (existingRatingForDBO !== -1) {
        console.log("DBO found in resetRating")
        setRating(DBO_Ratings[existingRatingForDBO].Ratings)
      } else {
        // If the DBO rating doesn't exist, set it to 0
        setRating(0)
      }
    }

    stars.forEach(star => {
      star.addEventListener(
        "click",
        function () {
          if (checkSelectedStar(star)) {
            resetRating()
            return
          }
          const index = parseInt(star.getAttribute("data-rate"))
          currentRatingIndex = index
          if (index == 1) {
            const modal = document.getElementById("my_modal_3")
            if (modal) {
              modal.showModal()
            }
          } else if (index === 2) {
            const modal = document.getElementById("my_modal_4")
            if (modal) {
              modal.showModal()
            }
          } else if (index == 3) {
            const modal = document.getElementById("my_modal_5")
            if (modal) {
              modal.showModal()
            }
          } else if (index == 4) {
            const modal = document.getElementById("my_modal_6")
            if (modal) {
              modal.showModal()
            }
          } else if (index == 5) {
            const modal = document.getElementById("my_modal_7")
            if (modal) {
              modal.showModal()
            }
          }
          // setRating(index);

          setTimeout(() => {
            const existingRatingForDBO = DBO_Ratings.findIndex(
              dbo_rating => dbo_rating.DBO === dbo
            )

            if (existingRatingForDBO === -1) {
              // If the DBO rating doesn't exist, create a new entry
              setDBO_Ratings(prevDBO_Ratings => [
                ...prevDBO_Ratings,
                {
                  DBO: dbo,
                  Ratings: currentRatingIndex
                }
              ])
            } else {
              // If the rating exists, update the existing rating
              setDBO_Ratings(prevDBO_Ratings => {
                const updatedDBO_Ratings = [...prevDBO_Ratings]
                updatedDBO_Ratings[
                  existingRatingForDBO
                ].Ratings = currentRatingIndex
                return updatedDBO_Ratings
              })
            }
          })
        },
        0
      )

      star.addEventListener("mouseover", function () {
        const index = parseInt(star.getAttribute("data-rate"))
        setRating(index)
      })

      star.addEventListener("mouseout", function () {
        setRating(currentRatingIndex)
      })
    })

    // Set the initial rating based on DBO_Ratings
    const initialRatingIndex = DBO_Ratings.findIndex(
      dbo_rating => dbo_rating.DBo === dbo
    )
    if (initialRatingIndex !== -1) {
      setRating(DBO_Ratings[initialRatingIndex].Ratings)
    } else {
      setRating(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbo, setDBO_Ratings])

  return (
    <div>
      <div className="container">
        <div className="info flex">
          <div className="emoji"></div>
          <div className="status"></div>
        </div>
        <div className="stars">
          <div className="star" data-rate="5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className="star" data-rate="4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className="star" data-rate="3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className="star" data-rate="2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className="star" data-rate="1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Screen
