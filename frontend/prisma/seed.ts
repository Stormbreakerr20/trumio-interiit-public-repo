import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.project.upsert({
        where: { id: '25332c96-42d3-47b0-b18e-bb8ce9d1d72d' },
        update: {},
        create: {
            project_name: 'Content Development- Elements, Compounds and Mixtures',
            duration_length: 3,
            duration_unit: 'weeks',
            description: 'Project description for Foundation School\n\nDevelop a detailed teaching aid for the topic “ Elements, Compounds and Mixtures” in Chemistry for students of Grade 6 in India, that can accompany the Central Board of Secondary Education (CBSE) curriculum. The teaching aid is based on a standard storyboard provided by the Foundation School and should be created using Microsoft PowerPoint. The learning aid will be used by teachers to teach students in a class of about 25 to 30 students. The aim of the learning aid is to:\n\n1. Help teachers teach more effectively, so that students understand individual units within the chapter in more detail through pictures, videos and explaining concepts\n2. Enable students to explore and question concepts through simple real-world observations and examples\n3. Standardise the methodology by which the same chapter is taught by different teachers to different classes in the school\n4. Reduce the cognitive load on students while learning the chapter\n\nThe Foundation school the chapter, as provided in the textbook, and examples of similar material already created.\n\nSkills required\n• Passion for the subject, including ability to understand and explain concepts to others\n• Ability to break down large concepts into simple and small units\n• Ability to find and adapt pictures, audio and video from online public sources\n• Good in reading, writing and speaking English\n\nDeliverables:\nIntermediate deliverable: Storyboard\nFinal Deliverable: Power point presentation\nNote: Final Deliverable will only begin after the Intermediate deliverable is approved.\n\nDuration\n4 weeks\n\nTeam size\n2',
            technical_requirements: {},
            availability: {},
            country: {},
            payment: {},
            nda: false,
            status: 'in_development',
        }
    })

    await prisma.project.upsert({
        where: { id: '3e9c1421-5ab9-428c-8ade-cb5e30ce1b38' },
        update: {},
        create: {
            project_name: 'Create a Tree Library which can serve as a guide for Urban planners and Landscapists for selecting trees suitable for various purposes',
            duration_length: 40,
            duration_unit: 'days',
            description: "Trees play a crucial role in urban planning, contributing to the overall sustainability, aesthetics, and well-being of urban environments. While planning the infrastructure for a new city or a township (Integrated or Residential) or a Tech-park, presently there is no Handy Tool / Guide available with with the City / Urban planners except Google, which can help them select Tree species which are suitable for various agro-climatic conditions / zones , for various purposes or say based on the space available for their root system to grow safely.\nThrough this Project we aim to create a Library of Trees growing across the 7 Continents, in the form of a search engine wherein a user can punch in the key-words for the various categories and criterias for selcting a tree meeting the desired criteria and the engine gives the list of trees meeting the required criteria's. To state a few examples the below are some of Tree selection criterias -\n1. Temperate Vs Tropical Climtic zone\n2. Evergreen Vs Deciduous\n3. Flowering Vs Non-prominent flowering / Shady\n4. Large Vs Small\n5. Deep Vs shallow rooted\n6. Tap root Vs Fibrous roots",
            technical_requirements: {},
            availability: {},
            country: {},
            payment: {},
            nda: false,
            status: 'in_development',
        }
    })
}

main().catch((err) => {
    console.error("Could not seed DB: ", err)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
}).finally(async () => {
    await prisma.$disconnect()
})