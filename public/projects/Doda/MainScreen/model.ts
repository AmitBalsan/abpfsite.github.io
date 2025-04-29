class Person {
  constructor(
    public name: string,
    public id: number,
    public email: string,
    public phone: number,
    public password: string,
    public address: string
  ) {}
}

class Student extends Person {
  grades: number[];
  attendance: number[];
  constructor(
    public name: string,
    public id: number,
    public email: string,
    public phone: number,
    public password: string,
    public address: string
  ) {
    super(name, id, email, phone, password, address);
    this.grades = [];
    this.attendance = [];
  }
}

class Lecturer extends Person {
  constructor(
    public name: string,
    public id: number,
    public email: string,
    public phone: number,
    public password: string,
    public address: string
  ) {
    super(name, id, email, phone, password, address);
  }
}

class Admin extends Person {
  constructor(
    public name: string,
    public id: number,
    public email: string,
    public phone: number,
    public password: string,
    public address: string
  ) {
    super(name, id, email, phone, password, address);
  }
}

class Course {
  public studentsCourse: Student[];
  public checkAtt: string[];
  public videos: string[];
  uid: string;
  constructor(
    public nameCourse: string,
    public datesCourse: string[],
    public lecturer: Lecturer
  ) {
    this.uid = uniqueId();
    this.studentsCourse = [];
    this.videos = [];
    this.checkAtt = [];
  }
}

class Message {
  uid: string;
  constructor(
    public nameC: string,
    public phoneC: number,
    public emailC: string,
    public msgC: string
  ) {
    this.uid = uniqueId();
  }
}

let messages: Message[] = [];
let courses: Course[] = [];
let lecturers: Lecturer[] = [];
let students: Student[] = [];
let admins: Admin[] = [];

const ronL = new Lecturer(
  "Ron mizrahi",
  123456789,
  "ron@gmail.com",
  +972565820,
  "123456",
  "ramat hasharon"
);

const morL = new Lecturer(
  "mor oren",
  147258369,
  "mor@gmail.com",
  +972565820,
  "159753",
  "ramat hasharon"
);

const ilanL = new Lecturer(
  "ilan haim",
  789456123,
  "ilan@gmail.com",
  +972565820,
  "2222",
  "ramat hasharon"
);

lecturers.push(ronL, morL, ilanL);

const fullC = new Course(
  "Full Stuck",
  ["1.5.23", "8.5.23", "15.5.23", "22.5.23", "29.5.23", "5.6.23"],
  lecturers[0]
);

const devopsC = new Course(
  "DevOps",
  ["17.5.23", "24.5.23", "31.5.23", "7.6.23", "14.6.23", "21.6.23", "28.6.23"],
  lecturers[1]
);

const qaC = new Course(
  "QA",
  [
    "11.5.23",
    "18.5.23",
    "25.5.23",
    "1.6.23",
    "8.6.23",
    "15.6.23",
    "22.6.23",
    "29.6.23",
  ],
  lecturers[2]
);

const cyber = new Course(
  "cyber",
  ["22.5.23", "29.5.23", "5.6.23", "10.6.23", "15.6.23", "22.6.23"],
  lecturers[0]
);

courses.push(fullC, devopsC, qaC, cyber);

const fullS1 = new Student(
  "oshrat sebbag",
  200670054,
  "oshrat@gmail.com",
  9725063214564,
  "159",
  "kinor 20"
);

const fullS2 = new Student(
  "dotan toledano",
  123485725,
  "dotan@gmail.com",
  972546042815,
  "25826",
  "kineret 2"
);

const fullS3 = new Student(
  "daniel daniel",
  15248759,
  "daniel@gmail.com",
  972506547825,
  "321456",
  "tamar 10"
);

const fullS4 = new Student(
  "amit balsan",
  122548743,
  "amit@gmail.com",
  972523514875,
  "11147",
  "reshef 42"
);

fullC.studentsCourse.push(fullS1, fullS2, fullS3, fullS4);

const cyberS1 = new Student(
  "hofit kashi",
  122548743,
  "hofit@gmail.com",
  972523514875,
  "1524",
  "reshef 42"
);

const cyberS2 = new Student(
  "adi tahor",
  122548743,
  "adi@gmail.com",
  972523514875,
  "adi",
  "reshef 42"
);

const cyberS3 = new Student(
  "oshrat sebbag",
  200670054,
  "oshrat@gmail.com",
  9725063214564,
  "159",
  "kinor 20"
);

cyber.studentsCourse.push(cyberS1, cyberS2, cyberS3);

const admin1 = new Admin(
  "admin admin",
  555555555,
  "admin@gmail.com",
  97254875425,
  "admin",
  "hermon 7"
);

admins.push(admin1);

students.push(fullS1, fullS2, fullS3, fullS4);
