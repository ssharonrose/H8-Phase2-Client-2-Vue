<script>
export default {
    name: "TableHeads",
    props: ["title"]
}
</script>

<template>
    <tr>
        <th scope="col" class="w-32 p-4" v-for="titleCol in title">{{ titleCol }}
        </th>
    </tr>
</template>

<style scoped></style>