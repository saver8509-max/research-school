import { PageHeader } from '../components/Layout'
import { Link } from '../components/Link'
import { getLessonById, evaluationPlans } from '../data/lessons'
import { asset } from '../lib/assets'

export function LessonPlanPage({id}) {
 const lesson=getLessonById(id)
 if(!lesson)return <section><PageHeader title="수업 지도안"/><Link to="/lessons" className="btn">수업 목록으로</Link></section>
 const {project,plan}=lesson
 return <section>
  <PageHeader title={`${lesson.grade} 프로젝트 공개수업`} description={`${project.subjects} · ${lesson.period}`}/>
  <section className="block"><h3>1. 프로젝트 소개</h3><article className="card"><h2>{project.title}</h2><p>{project.summary}</p></article></section>
  <section className="block"><h3>2. 프로젝트 학습 과정</h3><div className="process">{project.stages.map(([period,title,detail])=><article className="card" key={period}><p className="badge">{period}</p><h4>{title}</h4><p>{detail}</p></article>)}</div></section>
  <section className="block"><h3>3. 공개수업 안내</h3><article className="card"><p className="badge">{lesson.period}</p><h2>{plan.topic}</h2><p><strong>학습 목표</strong> · {plan.goals[0]}</p></article>
  <div className="process">{plan.process.map(({stage,activities})=>activities.map(a=><article className="card" key={stage} style={{opacity:a.status==='사전 실시'?.75:1,borderLeft:a.status==='공개수업'?'4px solid #ed7b93':'4px solid #c5cbd3'}}><p className="badge">{a.status}</p><h4>{a.title}</h4><p>{a.detail}</p></article>))}</div>
  {plan.process.some(p=>p.activities.some(a=>a.status==='사전 실시'))&&<p className="hint">※ ‘사전 실시’ 활동은 공개수업 전에 진행한 학습 활동입니다.</p>}
  </section>
  <section className="block"><h3>4. 평가 계획</h3>
    <div className="card evaluation-card">
      {evaluationPlans[lesson.id].items.map((item,index)=><div className="evaluation-item" key={index}>
        <h4>평가 내용{evaluationPlans[lesson.id].items.length>1?` ${index+1}`:''}</h4>
        <p>{item.content}</p>
        <div className="evaluation-table-wrap"><table className="evaluation-table"><tbody>
          {['잘함','보통','노력 요함'].map((level,i)=><tr key={level}><th scope="row">{level}</th><td>{item.criteria[i]}</td></tr>)}
        </tbody></table></div>
      </div>)}
      <p className="evaluation-method"><strong>평가 방법</strong> · {evaluationPlans[lesson.id].method}</p>
    </div>
  </section>
  <section className="block"><h3>5. 문해력·수리력 향상 전략</h3><div className="card"><p style={{whiteSpace:"pre-line"}}>{lesson.focus}</p></div></section>
  <section className="block"><h3>6. 원본 자료 다운로드</h3><div className="pdf-row"><a className="btn" href={asset(`materials/lessons/${lesson.id}-public.pdf`)} target="_blank" rel="noopener noreferrer">공개수업 차시 지도안 PDF 보기</a><a className="btn" href={asset(project.projectPdf)} download>프로젝트 활동 계획서 PDF 다운로드</a><a className="btn" href={asset(project.planPdf)} download>프로젝트 수업 과정안 PDF 다운로드</a></div></section>
  <div className="pdf-row"><Link to="/lessons" className="btn btn-ghost">다른 수업 보기</Link></div>
 </section>
}
