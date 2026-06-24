const courseList = document.getElementById("courseList");
function renderCourses(data) {/*hiển thị danh sách workshop*/

    if (!courseList) return;

    courseList.innerHTML = "";

    data.forEach(course => {

        courseList.innerHTML += `

        <div class="col-lg-4 col-md-6 col-12 mb-4">

            <div class="card h-100">

                <img src="${course.image}"
                     class="card-img-top"
                     alt="${course.title}">

                <div class="card-body">

                    <span class="badge bg-primary">
                        ${course.category}
                    </span>

                    <span class="badge bg-success">
                        ${course.level}
                    </span>

                    <h5 class="mt-3">
                        ${course.title}
                    </h5>

                    <p>
                        ${course.description}
                    </p>

                    <p>
                        <strong>Ngày:</strong>
                        ${course.date}
                    </p>

                    <button
                        class="btn btn-info me-2"
                        onclick="showDetail(${course.id})">
                        Xem chi tiết

                    </button>

                    <a href="register.html"
                       class="btn btn-primary">
                        Đăng ký

                    </a>

                </div>

            </div>

        </div>

        `;
    });
}
if (courseList) {

    renderCourses(courses);

    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const levelFilter =
        document.getElementById("levelFilter");

    const resetBtn =
        document.getElementById("resetBtn");

    function filterCourses() {/*tìm và lọc worshop*/

        const keyword =
            searchInput.value.toLowerCase();

        const category =
            categoryFilter.value;

        const level =
            levelFilter.value;

        const filtered =
            courses.filter(course => {

                const matchName =
                    course.title
                    .toLowerCase()
                    .includes(keyword);

                const matchCategory =
                    category === "" ||
                    course.category === category;

                const matchLevel =
                    level === "" ||
                    course.level === level;

                return (
                    matchName &&
                    matchCategory &&
                    matchLevel
                );

            });

        renderCourses(filtered);

    }

    searchInput.addEventListener(
        "input",
        filterCourses
    );

    categoryFilter.addEventListener(
        "change",
        filterCourses
    );

    levelFilter.addEventListener(
        "change",
        filterCourses
    );

    resetBtn.addEventListener(
        "click",
        () => {

            searchInput.value = "";
            categoryFilter.value = "";
            levelFilter.value = "";

            renderCourses(courses);

        }
    );

}
function showDetail(id) {/*xem chi tiết*/

    const course =
        courses.find(c => c.id === id);

    document.getElementById(
        "modalTitle"
    ).textContent = course.title;

    document.getElementById(
        "modalImage"
    ).src = course.image;

    document.getElementById(
        "modalDetail"
    ).textContent = course.detail;

    document.getElementById(
        "modalCategory"
    ).textContent = course.category;

    document.getElementById(
        "modalLevel"
    ).textContent = course.level;

    document.getElementById(
        "modalDate"
    ).textContent = course.date;

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "courseModal"
            )
        );

    modal.show();
}
    const registerForm =
    document.getElementById(
        "registerForm"
    );

    if (registerForm) {

    const courseSelect =
        document.getElementById(
            "courseSelect"
        );

    courses.forEach(course => {

        courseSelect.innerHTML += `
            <option value="${course.title}">
                ${course.title}
            </option>
        `;

    });
    document.getElementById("email")
    .addEventListener("input", function(){

    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(this.value)){
        document.getElementById(
            "emailError"
        ).textContent =
        "Email không hợp lệ";
    }
    else{
        document.getElementById(
            "emailError"
        ).textContent = "";
    }
});

    registerForm.addEventListener(
        "submit",
        function (e) {
            e.preventDefault();

        document.getElementById(
            "phoneError"
        ).textContent = "";

        document.getElementById(
            "classError"
        ).textContent = "";

        document.getElementById(
            "courseError"
        ).textContent = "";
        document.getElementById(
            "nameError"
         ).textContent = "";

        document.getElementById(
            "emailError"
        ).textContent = "";
        const fullName =
            document.getElementById(
            "fullName"
         ).value.trim();

        const email =
            document.getElementById(
            "email"
         ).value.trim();
        const phone =
            document.getElementById(
            "phone"
        ).value.trim();
        const className =
            document.getElementById(
            "className"
        ).value.trim();

        const course =
            document.getElementById(
            "courseSelect"
        ).value;
        const note =
            document.getElementById(
            "note"
        ).value.trim();
        let isValid = true;

        if (fullName.length < 3) {

        document.getElementById(
            "nameError"
        ).textContent =
            "Họ tên tối thiểu 3 ký tự";
            isValid = false;

            }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

        document.getElementById(
            "emailError"
        ).textContent =
            "Email không hợp lệ";
             isValid = false;
         }
         const phoneRegex =/^\d{9,11}$/;

            if (!phoneRegex.test(phone)) {

                document.getElementById(
                    "phoneError"
                ).textContent =
                    "SĐT phải từ 9-11 số";

                isValid = false;

            }

            if (className === "") {

                document.getElementById(
                    "classError"
                ).textContent =
                    "Không được để trống lớp";

                isValid = false;

            }

            if (course === "") {

                document.getElementById(
                    "courseError"
                ).textContent =
                    "Vui lòng chọn workshop";

                isValid = false;

            }

            if (!isValid) return;

            const registrations =
                JSON.parse(
                    localStorage.getItem(
                        "registrations"
                    )
                ) || [];

            const registration = {
            id: Date.now(),
            fullName,
            email,
            phone,
            className,
            course,
            note,
            createdAt:
                new Date()
            .toLocaleString()

    };

        registrations.push(
         registration
    );

        localStorage.setItem(
            "registrations",
            JSON.stringify(
                registrations
            )
        );

        alert(
            "Đăng ký thành công!"
    );

        registerForm.reset();

        }
    );
}

const registrationTable =
    document.getElementById(
        "registrationTable"
    );

function renderRegistrations() {/*hiển thị người đăng kí*/

    if (!registrationTable) return;

    const registrations =
        JSON.parse(
            localStorage.getItem(
                "registrations"
            )
        ) || [];

    registrationTable.innerHTML = "";

    if(registrations.length === 0){

        registrationTable.innerHTML = `
        <tr>
            <td colspan="9" class="text-center">
                Chưa có đăng ký nào
            </td>
        </tr>
        `;

        return;
    }
registrations.forEach(
    (item, index) => {

        registrationTable.innerHTML += `

    <tr>

        <td>${index + 1}</td>

         <td>${item.fullName}</td>

         <td>${item.email}</td>

         <td>${item.phone}</td>

        <td>${item.className}</td>

        <td>${item.course}</td>

        <td>${item.note}</td>

        <td>${item.createdAt}</td>

    <td>

            <button
                class="btn btn-danger btn-sm"
                onclick="deleteRegistration(${item.id})">

                Xóa

            </button>

    </td>

    </tr>

    `;
    }
);

}

function deleteRegistration(id){/*xóa1 đk*/

    if(
        !confirm(
            "Bạn có chắc muốn xóa?"
        )
    ){
        return;
    }

    let registrations =
        JSON.parse(
            localStorage.getItem(
                "registrations"
            )
        ) || [];

    registrations =
        registrations.filter(
            item => item.id !== id
        );

    localStorage.setItem(
        "registrations",
        JSON.stringify(
            registrations
        )
    );

    renderRegistrations();

}

if (registrationTable) {

    renderRegistrations();

    const clearAllBtn =
        document.getElementById(
            "clearAllBtn"
        );

    clearAllBtn.addEventListener(
        "click",
        () => {

            if (
                confirm(
                    "Xóa toàn bộ đăng ký?"
                )
            ) {

                localStorage.removeItem(
                    "registrations"
                );

                renderRegistrations();

            }

        }
    );
    }