<template>
    <div class="grid gap-10">
        <Hero />
        <Section id="projects">
            <Projects />
        </Section>
        <Section id="skills" title="Skills">
            <SkillCloud />
        </Section>
        <Section id="experience" title="Experience">
            <ExperienceTimeline />
        </Section>
        <Section id="contact" title="Contact">
            <ContactCard />
        </Section>
    </div>
</template>


<script setup lang="ts">
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
import Projects from '../components/Projects.vue'
import SkillCloud from '../components/SkillCloud.vue'
import ExperienceTimeline from '../components/ExperienceTimeline.vue'
import ContactCard from '../components/ContactCard.vue'
</script>