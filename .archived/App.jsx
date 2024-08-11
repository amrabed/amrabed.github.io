
import { useEffect } from react;

function Heading(title) {
    return (
        <div className="Container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">{title}</h2>
                    <hr class-name="mx-auto" />
                </div>
            </div>
        </div>
    )
}


function DegreeView(degree) {
    return (
        <div className="container-fluid align-middle my-auto mx-auto">
            <div className="row">
                <div className="col-lg-4 col-md-6 mx-auto">
                    <div className="service-box mt-5 mx-auto">
                        {/* <img src="assets/img/education.png" style={{ height: 200 }} /> */}
                        <Image src="/next.svg" width={200} height={200} priority />
                        <h4>{degree.title}</h4>
                        <h5><a href={degree.institute.url} target="_blank">{degree.institute.name}</a></h5>
                        <p className="text-muted">{degree.time}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


function Section(id, heading, view) {
    return (
        <div id={id} className="section my-auto">
            <Heading title={heading} />
            {view}
        </div>
    )
}


const MainPage = () => {
    function getView(data, itemView) {
        return data.map((item) => { itemView(item) })
    }

    function loadData(file) {
        return useEffect(() => {
            fetch('/path-to-your-json/data.json')
                .then(response => response.json())
                .then(data => setItems(data))
                .catch(error => console.error('Error loading data:', error));
        }, []);
    }

    return (
        <main>
            <header class="masthead text-center text-white d-flex">
                <div class="container my-auto">
                    <div class="row">
                        <div class="col-lg-10 mx-auto">
                            <img src="assets/img/amrabed.jpeg" alt="profile picture" class="rounded-circle" style="width: 140px" />
                            <h1 class="text-uppercase">Amr Abed</h1>
                            <hr />
                            <div class="col-lg-8 mx-auto">
                                <p>Computer Engineer • Researcher • Instructor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <Section id="education" heading="Education" view={loadData("education.json").map((degree) => <DegreeView degree={degree} />)} />
                {/* <Section id="certifications" heading="Certifications" view={getView()} />
                <Section id="experience" heading="Certifications" view={getView()} />
                <Section id="skills" heading="Skills" view={getView()} /> */}
            </div>
        </main>
    )
}

export default MainPage